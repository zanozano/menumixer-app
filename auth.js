const jwt = require('jsonwebtoken');
const config = require('./config');

let validateAccount = {
    isLogined: false,
    isAdmin: false,
    isUser: false,
    username: '',
    id: '',
};

const verifyToken = (token) => {
    if (!token) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, config.secretKey);
        return decoded;
    } catch (err) {
        return false;
    }
};

module.exports = {
    verifyToken,
    secretKey: config.secretKey,
    validateAccount,
};
