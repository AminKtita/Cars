const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const carRoutes = require('./routes/cars');
const brandLogoRoutes = require('./routes/brandLogos');
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
const userActionsRoutes = require('./routes/userActions');
const favoriteRoutes = require('./routes/favorites');
const filterPresetRoutes = require('./routes/filterPresets');
const recommendationRoutes = require('./routes/recommendation');
const path = require('path');


const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization','X-Requested-With','Accept'], // Allow these headers
}));

// Handle preflight requests
app.options('*', cors()); // Allow all preflight requests

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/scraped_data')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/cars', carRoutes);
app.use('/brand-logos', brandLogoRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/user-actions', userActionsRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/filter-presets', filterPresetRoutes);
app.use('/api/recommend', recommendationRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Protected route example
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", userId: req.userId });
});

// Start the server
app.listen(8000, () => {
  console.log('Node.js backend running on port 8000');
});
