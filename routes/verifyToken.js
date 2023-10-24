const jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.SECRATE;

function verifyToken(req, res, next) {

    const token = req.headers.authorization;
    
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