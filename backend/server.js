require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ===== ROUTE IMPORTS =====
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const lookupRoutes = require('./routes/lookup');
const preferencesRoutes = require('./routes/preferences');
const roadmapRoutes = require('./routes/roadmap');
const destinationRoutes = require('./routes/destinations');
const placeRoutes = require('./routes/places');
const hotelRoutes = require('./routes/hotels');
const hostRoutes = require('./routes/hosts');
const hostRegistrationRoutes = require('./routes/hostRegistrations');
const expenseRoutes = require('./routes/expenses');
const safetyRoutes = require('./routes/safety');
const reviewRoutes = require('./routes/reviews');

// ===== MIDDLEWARE IMPORTS =====
const errorHandler = require('./middleware/errorHandler');

// ===== APP INIT =====
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
];
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

// ===== CORE MIDDLEWARE =====
app.use(cors({
    origin: allowedOrigins,
    credentials: true,   // required for cookies to be sent cross-origin
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: '🌍 Time2Travel API is running.',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

// ===== MOUNT ROUTES =====
// Module 1: User Management
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Module 2: Travel Preferences
app.use('/api/lookup', lookupRoutes);
app.use('/api/preferences', preferencesRoutes);

// Module 3: Intelligent Roadmap Generator
app.use('/api/roadmap', roadmapRoutes);

// Module 4: Map & Visualization
app.use('/api/destinations', destinationRoutes);
app.use('/api/places', placeRoutes);

// Module 5: Accommodation
app.use('/api/hotels', hotelRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/host-registrations', hostRegistrationRoutes);

// Module 6: Expense Estimation
app.use('/api/expenses', expenseRoutes);

// Module 7: Safety & Reviews
app.use('/api/safety', safetyRoutes);
app.use('/api/reviews', reviewRoutes);

// ===== 404 HANDLER =====
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found.` });
});

// ===== GLOBAL ERROR HANDLER (must be last) =====
app.use(errorHandler);

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║       🌍  Time2Travel Backend API            ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║  Server  : http://localhost:${PORT}               ║`);
    console.log(`║  Health  : http://localhost:${PORT}/api/health    ║`);
    console.log('║  Mode    : ' + (process.env.NODE_ENV || 'development') + '                         ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
});

module.exports = app;
