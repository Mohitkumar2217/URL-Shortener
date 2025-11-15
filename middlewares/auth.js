// middlewares/auth.js
const { getUser } = require("../services/auth");

// Reads token from cookie (cookie name: token)
async function checkforAuthentication(req, res, next) {
  req.user = null;
  try {
    const token = req.cookies?.token;
    if (!token) return next();
    const user = await getUser(token); // getUser is sync, still using await is safe
    if (user) req.user = user;
  } catch (err) {
    console.warn("checkforAuthentication token error:", err);
    req.user = null;
  }
  next();
}

function restrictTo(roles = []) {
  return (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized");
    }
    next();
  };
}

module.exports = { checkforAuthentication, restrictTo };
