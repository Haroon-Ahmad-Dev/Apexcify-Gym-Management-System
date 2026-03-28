require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

/**
 * ✅ ENVIRONMENT VALIDATION
 * Validate required environment variables on startup
 */
const requiredEnvVars = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY',
  'EMAIL_USER',
  'EMAIL_PASS'
];

const missingVars = requiredEnvVars.filter((variable) => !process.env[variable]);

if (missingVars.length > 0) {
  console.error('🔴 FATAL: Missing required environment variables:');
  missingVars.forEach((variable) => console.error(`  ❌ ${variable}`));
  console.error('\nPlease add these to your .env file');
  process.exit(1);
}

console.log('✅ All required environment variables found');

/**
 * 🚀 Start Server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // Start Express server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`🚀 Gym Backend Server Running`);
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`${'='.repeat(50)}\n`);
    });
  } catch (error) {
    console.error('🔴 FATAL: Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
