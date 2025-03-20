const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const carRoutes = require('./routes/cars');
const brandLogoRoutes = require('./routes/brandLogos');
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
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

// Protected route example
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", userId: req.userId });
});

// Start the server
app.listen(8000, () => {
  console.log('Node.js backend running on port 8000');
});