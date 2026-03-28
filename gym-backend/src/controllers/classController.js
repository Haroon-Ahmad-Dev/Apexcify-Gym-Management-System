const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  const gymClass = await Class.create(req.body);
  res.json(gymClass);
};

exports.getClasses = async (req, res) => {
  const classes = await Class.find().populate('trainer', 'name');
  res.json(classes);
};
