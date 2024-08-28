const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  tags: [String],
  goal: Number,
  completionStatus: [{
    date: Date,
    completed: Boolean
  }]
});

module.exports = mongoose.model('Habit', habitSchema);