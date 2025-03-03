const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/cars');
const cors = require('cors'); // Import the cors package


const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/scraped_data')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));


// Use car routes
app.use('/cars', carRoutes);
console.log("Car routes loaded successfully");


// Start the server
app.listen(8000, () => {
  console.log('Node.js backend running on port 8000');
});