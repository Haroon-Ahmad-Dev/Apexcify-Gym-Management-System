const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: String,
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: String,
  capacity: Number
});

module.exports = mongoose.model('Class', classSchema);
