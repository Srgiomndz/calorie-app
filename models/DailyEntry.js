const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  intake: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Entry', EntrySchema);
