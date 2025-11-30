const jwt = require('jsonwebtoken');
const JWT_SECRET = 'KashifSupermostSecretkey';

const fetchuser = (req, res, next) => {
    // Get token from header
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            error: "No token provided. Please authenticate using a valid token."
        });
    }

    try {
        // Verify token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.error("JWT Error:", error.message);

        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
};

module.exports = fetchuser;
