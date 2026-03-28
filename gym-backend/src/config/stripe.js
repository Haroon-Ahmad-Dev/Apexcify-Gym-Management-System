/**
 * Stripe Configuration Module
 * Initializes Stripe SDK with API credentials from environment
 */

const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    maxNetworkRetries: 3,
    timeout: 60000
});

module.exports = stripe;
