// routes/userActions.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware'); // Add this line

router.post('/', authMiddleware, async (req, res) => {
  try {
    const action = {
      userId: req.userId, // From auth middleware
      actionType: req.body.actionType,
      carId: req.body.carId ? new mongoose.Types.ObjectId(req.body.carId) : null,
      details: req.body.details,
      timestamp: new Date(),
    };

    const db = mongoose.connection.db;
    await db.collection('user_actions').insertOne(action);
    
    res.status(200).json({ message: 'Action logged' });
  } catch (err) {
    console.error('Error logging action:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;