// Auto-catch async errors without manual try-catch
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('./utils/cronJob');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payments', paymentRoutes);

// 404 Handler (must be before error handler)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        status: 404,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler (MUST be last)
app.use(errorHandler);

module.exports = app;
