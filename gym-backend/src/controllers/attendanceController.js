const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  const attendance = await Attendance.create({
    member: req.user.id
  });
  res.json({ message: 'Attendance marked', attendance });
};

exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({ member: req.user.id });
  res.json(records);
};

exports.getAllAttendance = async (req, res) => {
  const records = await Attendance.find().populate('member', 'name email');
  res.json(records);
};
