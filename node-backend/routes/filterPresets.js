const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const FilterPreset = require('../models/FilterPreset');

// Save filter preset
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, filters } = req.body;
    
    const preset = new FilterPreset({
      user: req.userId,
      name,
      filters
    });

    await preset.save();
    res.status(201).json(preset);
  } catch (err) {
    res.status(500).json({ message: 'Error saving filter preset' });
  }
});

// Get user's filter presets
router.get('/', authMiddleware, async (req, res) => {
  try {
    const presets = await FilterPreset.find({ user: req.userId }).sort('-createdAt');
    res.json(presets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching filter presets' });
  }
});

// Delete filter preset
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const preset = await FilterPreset.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    
    if (!preset) return res.status(404).json({ message: 'Preset not found' });
    res.json({ message: 'Preset deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting preset' });
  }
});

module.exports = router;