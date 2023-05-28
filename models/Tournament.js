// models/Tournament.js
const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Participant',
  }],
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Tournament', tournamentSchema);
