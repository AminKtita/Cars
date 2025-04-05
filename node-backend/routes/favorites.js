const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Favorite = require('../models/Favorite');

// Add/Remove favorite
router.post('/toggle/:carId', authMiddleware, async (req, res) => {
    console.log(`Received toggle request for car: ${req.params.carId}`);
  try {
    const { carId } = req.params;
    const userId = req.userId;

    const existingFavorite = await Favorite.findOne({ user: userId, car: carId });
    
    if (existingFavorite) {
      await Favorite.deleteOne({ _id: existingFavorite._id });
      return res.json({ isFavorite: false });
    }

    const newFavorite = new Favorite({ user: userId, car: carId });
    await newFavorite.save();
    res.json({ isFavorite: true });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if car is favorite
router.get('/check/:carId', authMiddleware, async (req, res) => {
    console.log(`Received check request for car: ${req.params.carId}`);
  try {
    const favorite = await Favorite.findOne({
      user: req.userId,
      car: req.params.carId
    });
    res.json({ isFavorite: !!favorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const fav = await Favorite.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(fav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;