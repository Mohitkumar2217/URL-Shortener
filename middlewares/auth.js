//middlewares/auth.js

const { getUser } = require("../services/auth");

// #### For cookies use only
// authentication
async function checkforAuthentication(req, res, next) {
    try {
        req.user = null;

        // 1) prefer cookie token (controllers set cookie name "token")
        let tokenSource = req.cookies?.token;

        // 2) fallback to Authorization header (Bearer <token>)
        if (!tokenSource && req.headers?.authorization) {
            const auth = req.headers.authorization;
            if (typeof auth === "string" && auth.startsWith("Bearer ")) {
                tokenSource = auth.split(" ")[1];
            }
        }

        if (!tokenSource) return next();

        // Support getUser being sync or async
        const user = await Promise.resolve(getUser(tokenSource));
        if (user) req.user = user;
        return next();
    } catch (err) {
        console.error("auth.checkforAuthentication error:", err);
        // don't block request on auth errors — treat as unauthenticated
        req.user = null;
        return next();
    }
}

// authorization
function restrictTo(roles) {
    // normalize roles to array
    const allowed = Array.isArray(roles) ? roles : [roles];
    return (req, res, next) => {
        if (!req.user) return res.redirect("/login");
        if (!allowed.includes(req.user.role)) {
            return res.status(403).send("Unauthorized");
        }
        return next();
    };
}

module.exports = {
    checkforAuthentication,
    restrictTo,
}