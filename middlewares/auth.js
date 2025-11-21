// middlewares/auth.js
const { getUser } = require("../services/auth");

async function checkforAuthentication(req, res, next) {
    try {
        req.user = null;
        console.log("auth: cookies:", req.cookies);
        console.log("auth: session:", req.session);

        let token = req.cookies?.token;

        // fallback to Authorization: Bearer <token>
        const authHeader = req.headers?.authorization;
        if (!token && typeof authHeader === "string") {
            const parts = authHeader.split(" ");
            if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
                token = parts[1];
            }
        }

        if (token) {
            // support getUser being sync or async
            const user = await Promise.resolve(getUser(token));
            if (user) req.user = user;
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
