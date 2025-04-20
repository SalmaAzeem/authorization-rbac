const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    const secret_key = process.env.SECRET_KEY;
    const options = {
        expiresIn: '1h',
    };
    const token = jwt.sign({id: id, role: role}, secret_key, options);
    return token;
};

const generateRefreshToken = (id) => {
    const secret_key = process.env.SECRET_REFRESH_KEY;
    const options = {
        expiresIn: '7d',
    };
    const refresh_token = jwt.sign({id: id}, secret_key, options);
    return refresh_token;
}

module.exports = {generateToken, generateRefreshToken};

// resource: https://medium.com/@gb.usmanumar/how-to-create-and-implement-json-web-token-jwt-in-node-js-with-express-js-28b45848ee73