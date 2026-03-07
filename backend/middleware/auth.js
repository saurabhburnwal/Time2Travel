const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify JWT token from Authorization header.
 * Attaches req.user = { userId, email, role } on success.
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, name, email, role }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};

module.exports = verifyToken;
