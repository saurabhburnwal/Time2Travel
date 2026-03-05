const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT token from HttpOnly cookie.
 * Falls back to Authorization header for backward-compat with any direct API calls.
 * Attaches req.user = { userId, name, email, role } on success.
 */
const verifyToken = (req, res, next) => {
    // Primary source: HttpOnly cookie (secure, JS-inaccessible)
    const cookieToken = req.cookies?.tt_token;

    // Fallback: Authorization header (for REST clients / testing)
    const authHeader = req.headers['authorization'];
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    const token = cookieToken || headerToken;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No session found.',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, name, email, role }
        next();
    } catch (err) {
        // Clear the invalid cookie so the client doesn't keep sending it
        res.clearCookie('tt_token', { httpOnly: true, sameSite: 'strict' });
        return res.status(401).json({
            success: false,
            message: 'Session expired or invalid. Please log in again.',
        });
    }
};

module.exports = verifyToken;
