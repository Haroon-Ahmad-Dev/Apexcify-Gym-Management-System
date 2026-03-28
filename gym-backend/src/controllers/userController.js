const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getTrainers = async (req, res) => {
  const trainers = await User.find({ role: 'trainer' }).select('-password');
  res.json(trainers);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User removed' });
};
