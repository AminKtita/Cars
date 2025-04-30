const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require("bcryptjs");
const Favorite = require('../models/Favorite'); 
const FilterPreset = require('../models/FilterPreset'); 




// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Set token expiry based on "Remember Me"
    const expiresIn = rememberMe ? "7d" : "1h"; // 7 days if "Remember Me" is checked, else 1 hour

    // Create JWT
    const token = jwt.sign({ userId: user._id ,username:user.username}, process.env.JWT_SECRET, {
      expiresIn,
    });

    // Return token
    res.json({ token,id:user._id, });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -__v -updatedAt')
      .lean();

    if (!user) throw new Error('User not found');
    
    const favoritesCount = await Favorite.countDocuments({ user: req.userId });
    const filtersCount = await FilterPreset.countDocuments({ user: req.userId });

    
    res.json({
      ...user,
      createdAt: user.createdAt.toISOString(),
      favoritesCount,filtersCount
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) throw new Error('User not found');


    if (req.body.newPassword) {
      if (!req.body.currentPassword) {
        throw new Error('Current password is required');
      }

      const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!isMatch) throw new Error('Current password is incorrect');

      if (req.body.newPassword !== req.body.confirmPassword) {
        throw new Error('New passwords must match');
      }

      // Directly set and mark as modified
      user.password = req.body.newPassword;
      user.markModified('password'); // Explicitly mark as modified
    }


    // Handle username/email updates
    if (req.body.username && req.body.username !== user.username) {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) throw new Error('Username already taken');
      user.username = req.body.username;
    }

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) throw new Error('Email already in use');
      user.email = req.body.email;
    }

    // Handle profile image upload
    if (req.file) {
      // Delete old profile image if it exists
      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, '../uploads', user.profileImage.split('/').pop());
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      user.profileImage = '/uploads/' + req.file.filename;
    }

    await user.save();
    
    // Return updated user data without password
    const userData = user.toObject();
    delete userData.password;
    res.json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;