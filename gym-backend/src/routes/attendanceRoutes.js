const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const {
  markAttendance,
  getMyAttendance,
  getAllAttendance
} = require('../controllers/attendanceController');

// Member
router.post('/mark', auth, role('member'), markAttendance);
router.get('/me', auth, role('member'), getMyAttendance);

// Admin
router.get('/all', auth, role('admin'), getAllAttendance);

module.exports = router;
