const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const {
  createClass,
  getClasses
} = require('../controllers/classController');

// Admin only
router.post('/', auth, role('admin'), createClass);

// All users
router.get('/', auth, getClasses);

module.exports = router;
