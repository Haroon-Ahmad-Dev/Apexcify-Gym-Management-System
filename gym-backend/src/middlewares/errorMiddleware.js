/**
 * Global Error Handler Middleware
 * Catches all errors (sync, async, and operational) and sends clean JSON response
 * MUST be the last middleware in app.js
 */

const errorHandler = (err, req, res, next) => {
    // Default error values
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log error to console (in production, use proper logging service)
    console.error('🔴 ERROR:', {
        status: statusCode,
        message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Handle Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Validation Error',
            errors
        });
    }

    // Handle Mongoose Duplicate Key Errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            success: false,
            status: 409,
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
        });
    }

    // Handle Mongoose Cast Errors (Invalid ID format)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            status: 400,
            message: `Invalid ${err.path}: ${err.value}`
        });
    }

    // Handle JWT Errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            status: 401,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            status: 401,
            message: 'Token expired. Please login again'
        });
    }

    // Handle Stripe Errors
    if (err.type && err.type.includes('StripeError')) {
        return res.status(402).json({
            success: false,
            status: 402,
            message: err.message || 'Payment processing failed'
        });
    }

    // Generic error response
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        // Include stack trace only in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
