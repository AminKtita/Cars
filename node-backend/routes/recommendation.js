const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Extracted userId:', req.userId); 
    const userId = req.userId;
    const recommendationUrl = `http://recommender:8003/recommend/${userId}`;
    console.log('Calling recommendation service:', recommendationUrl); 

    const response = await axios.get(recommendationUrl);
    
    console.log('Recommendation service response:', response.data); 
    res.json(response.data);
  } catch (err) {
    console.error('Full error details:', {
      message: err.message,
      response: err.response?.data,
      stack: err.stack
    });
    res.status(500).json({ 
      error: 'Failed to get recommendations',
      internalError: err.message 
    });
  }
});module.exports = router;