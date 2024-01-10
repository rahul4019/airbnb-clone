const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Checks user is logged in based on passed token and set the user in request
exports.isLoggedIn = async (req, res, next) => {
    
    // token could be found in request cookies or in reqest headers
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Login first to access this page',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        } else if (error instanceof TypeError && error.message.includes('Cannot read properties of undefined')) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header not found',
            });
        } else {
            // Log other unexpected errors
            console.error('Unexpected error:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
