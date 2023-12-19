const jwt = require('jsonwebtoken');
require("dotenv").config();

function verifyToken(req, res, next) {

    const secretKey = process.env.SECRATE;
    const authHeader = req.headers.authorization;
    
    // In some case it was not working without this specific line.
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
        
        if (err) {
            return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
        }
        
        req.user = decoded; // Attach the user data to the request object
        next();
    });
}

module.exports = verifyToken;