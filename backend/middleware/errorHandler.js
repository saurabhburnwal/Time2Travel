/**
 * Global Express error handler.
 * Should be the LAST middleware registered in server.js.
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
