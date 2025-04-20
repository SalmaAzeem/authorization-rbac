const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY;

const authenticateMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: 'access denied, no token provided'
        });
    }
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.error("invalid token: ", error);
        return res.status(400).json({error: 'invalid token'});
    }
};

module.exports = authenticateMiddleware;