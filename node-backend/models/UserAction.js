const mongoose = require('mongoose');

const userActionSchema = new mongoose.Schema({
  // Your schema fields here
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: String,
  carId: { type: mongoose.Schema.Types.ObjectId },
  timestamp: Date
}, { 
  collection: 'user_actions' // Explicitly set collection name
});

module.exports = mongoose.model("UserAction", userActionSchema);