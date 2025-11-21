// middlewares/auth.js
const { getUser } = require("../services/auth");
const User = require("../models/user");

async function checkforAuthentication(req, res, next) {
    try {
        req.user = null;
        // session-based auth: prefer session userId
        if (req.session && req.session.userId) {
            const user = await User.findById(req.session.userId).select("-password").lean();
            if (user) {
                req.user = user;
            }
        }
        return next();
    } catch (err) {
        console.error("auth.checkforAuthentication error:", err);
        req.user = null;
        return next();
    }
}

// authorization factory (not async)
function restrictTo(roles) {
    const allowed = Array.isArray(roles) ? roles : [roles];
    return (req, res, next) => {
        if (!req.user) {
            // not authenticated
            return res.redirect("/login"); // or: return res.status(401).send("Authentication required")
        }
        if (!allowed.includes(req.user.role)) {
            // authenticated but not allowed
            return res.status(403).send("Forbidden");
        }
        return next();
    };
}

module.exports = {
    checkforAuthentication,
    restrictTo,
};
