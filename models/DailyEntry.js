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
// Working on creating a instance method to tansform Date response to something thats easier to work with
EntrySchema.methods.formatDate = function (datePropery) {
  const newDate = new Date(this[dateProperty]);
  let formattedDate = `${newDate.getFullYear()}-`;
  formattedDate += `${`0${newDate.getMonth() + 1}`.slice(-2)}-`;
  formattedDate += `${`0${newDate.getDate()}`.slice(-2)}`;
  return formattedDate;
};

module.exports = mongoose.model('Entry', EntrySchema);
