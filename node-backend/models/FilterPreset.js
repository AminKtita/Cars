const mongoose = require('mongoose');

const filterPresetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  filters: {
    selectedBrands: [String],
    selectedbodyTypes: [String],
    selectedModel: String,
    minPrice: Number,
    maxPrice: Number,
    selectedTransmissions: [String],
    selectedFuelTypes: [String],
    minYear: Number,
    maxYear: Number,
    minMileage: Number,
    maxMileage: Number,
    minPowerCV: Number,
    maxPowerCV: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FilterPreset', filterPresetSchema);