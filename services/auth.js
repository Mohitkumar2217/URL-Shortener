const jwt = require("jsonwebtoken");
const secret = "Mohitkava$32";
// For statefull auth
// const sessionIdToUserMap = new Map();


function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
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