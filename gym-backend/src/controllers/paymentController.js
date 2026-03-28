const stripe = require('../config/stripe');
const Payment = require('../models/Payment');

/**
 * Create a Stripe Payment Intent
 * POST /api/payments
 * Body: { amount: number (in dollars), paymentType: string, classId?: string }
 */
exports.createPayment = async (req, res) => {
  const { amount, paymentType, classId } = req.body;
  const userId = req.user.id;

  // ✅ Validation
  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0'
    });
  }

  if (!paymentType) {
    return res.status(400).json({
      success: false,
      message: 'paymentType is required (membership, class, personal_training, other)'
    });
  }

  // ✅ Create Payment Intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      userId,
      paymentType,
      classId: classId || 'N/A'
    },
    description: `${paymentType} payment for user ${userId}`
  });

  // ✅ Store payment record in database
  const payment = await Payment.create({
    user: userId,
    amount: Math.round(amount * 100), // Store in cents
    status: 'pending',
    paymentType,
    stripePaymentIntentId: paymentIntent.id,
    references: {
      classId: classId || null
    }
  });

  res.status(200).json({
    success: true,
    message: 'Payment intent created successfully',
    clientSecret: paymentIntent.client_secret,
    paymentId: payment._id
  });
};
