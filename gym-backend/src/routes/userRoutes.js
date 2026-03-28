const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const {
  getAllUsers,
  getTrainers,
  deleteUser
} = require('../controllers/userController');

// Admin only
router.get('/', auth, role('admin'), getAllUsers);
router.get('/trainers', auth, role('admin'), getTrainers);
router.delete('/:id', auth, role('admin'), deleteUser);

module.exports = router;
