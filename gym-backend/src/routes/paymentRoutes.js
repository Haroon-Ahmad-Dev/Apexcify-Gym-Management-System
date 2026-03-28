const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const { createPayment } = require('../controllers/paymentController');

// Member
router.post('/', auth, role('member'), createPayment);

module.exports = router;
