// routes/userActions.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');

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
router.get('/', async (req, res) => {
  try {
    const actions = await mongoose.connection.db.collection('user_actions')
      .find({ userId: req.userId })
      .toArray();
      
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
    const views = await mongoose.connection.db.collection('user_actions')
      .find({ 
        userId: req.userId, 
        actionType: 'view' 
      })
      .sort({ timestamp: -1 })
      .toArray();

    res.json(views);
  } catch (err) {
    console.error('Error fetching view actions:', err);
    res.status(500).json({ 
      error: 'Failed to retrieve view history',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});


module.exports = router;