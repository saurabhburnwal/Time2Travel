/**
 * Factory middleware: restrict access to specific roles.
 * Usage: requireRole('admin') or requireRole('admin', 'host')
 */
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated.',
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role(s): ${allowedRoles.join(', ')}.`,
            });
        }

        next();
    };
};

module.exports = requireRole;
