const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const secret =process.env.SECRET;
// For statefull auth
// const sessionIdToUserMap = new Map();


function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secret);
    // sessionIdToUserMap.set(id, user);
}

function getUser(token) {
    if(!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
}