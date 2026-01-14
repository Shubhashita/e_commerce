const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
};

const verifyToken = async (token) => {
    try {
        const verified = await jwt.verify(token, SECRET);
        return verified;
    } catch (err) {
        return null;
    }
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
};