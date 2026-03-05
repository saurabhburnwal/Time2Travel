const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/db');

// ── Cookie config ────────────────────────────────────────────────────────────
const COOKIE_NAME = 'tt_token';

/**
 * Cookie options for the JWT.
 *  - httpOnly  : JS cannot read it → XSS-safe
 *  - sameSite  : 'strict' → CSRF-safe (cookie not sent from foreign origins)
 *  - secure    : true in production (HTTPS only); false in dev so localhost works
 *  - maxAge    : matches JWT expiry (7 days)
 */
const cookieOptions = (res) => ({
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days in ms
});

/**
 * Set the JWT inside an HttpOnly cookie.
 * Does NOT include the token in the JSON response body.
 */
function setAuthCookie(res, token) {
    res.cookie(COOKIE_NAME, token, cookieOptions(res));
}

/**
 * Clear the auth cookie (logout).
 */
function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });
}

/**
 * Generate a signed JWT for a user
 */
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.user_id, name: user.name, email: user.email, role: user.role_name.toLowerCase() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

// ── Validation rules ─────────────────────────────────────────────────────────
exports.registerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').optional({ checkFalsy: true })
        .matches(/^[0-9+\-\s()]{7,15}$/).withMessage('Invalid phone number'),
    body('gender').optional({ checkFalsy: true }).isIn(['MALE', 'FEMALE', 'OTHER']).withMessage('Gender must be MALE, FEMALE, or OTHER'),
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
];

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
exports.getMe = async (req, res, next) => {
    try {
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.phone, u.gender, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.user_id = $1 AND u.is_active = true`,
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            clearAuthCookie(res);
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = result.rows[0];
        res.json({
            success: true,
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: (user.role_name || 'Traveler').toLowerCase(),
            },
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/register ───────────────────────────────────────────────────
exports.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password, phone, gender, role } = req.body;

        // Check if user already exists
        const existing = await query('SELECT user_id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already registered.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Resolve role: use provided role (traveler or host), default to traveler
        const requestedRole = (role || 'traveler').toLowerCase();
        const roleResult = await query(
            `SELECT role_id, role_name FROM roles WHERE LOWER(role_name) = $1 LIMIT 1`,
            [requestedRole]
        );
        const role_id = roleResult.rows[0]?.role_id || 2;
        const role_name = roleResult.rows[0]?.role_name || 'Traveler';

        // Insert user
        const result = await query(
            `INSERT INTO users (name, email, password_hash, phone, gender, role_id, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, true)
             RETURNING user_id, name, email, phone, gender, role_id, created_at`,
            [name, email, password_hash, phone || null, (gender || 'OTHER').toUpperCase(), role_id]
        );

        const user = result.rows[0];
        user.role_name = role_name;

        const token = generateToken(user);
        setAuthCookie(res, token);   // ← JWT goes into HttpOnly cookie, NOT response body

        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: role_name.toLowerCase(),
            },
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/login ──────────────────────────────────────────────────────
exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        // Fetch user with role
        const result = await query(
            `SELECT u.user_id, u.name, u.email, u.password_hash, u.phone, u.gender,
                    u.is_active, r.role_name
             FROM users u
             LEFT JOIN roles r ON u.role_id = r.role_id
             WHERE u.email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Email not registered.' });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({ success: false, message: 'Account is deactivated. Contact admin.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }

        const token = generateToken(user);
        setAuthCookie(res, token);   // ← JWT goes into HttpOnly cookie, NOT response body

        res.json({
            success: true,
            message: 'Login successful.',
            user: {
                userId: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                role: (user.role_name || 'Traveler').toLowerCase(),
            },
        });
    } catch (err) {
        next(err);
    }
};

// ── POST /api/auth/logout ─────────────────────────────────────────────────────
exports.logout = (req, res) => {
    clearAuthCookie(res);
    res.json({ success: true, message: 'Logged out successfully.' });
};
