// middlewares/freeLimits.js
const FREE_LIMIT = Number(process.env.FREE_LIMIT) || 5;

function freeLimit(req, res, next) {
  // Allow unlimited if logged in
  if (req.user) return next();

  if (!req.session) {
    console.warn("Session not initialized for freeLimit");
    return res.status(500).send("Session not initialized");
  }

  if (typeof req.session.freeCount !== "number") req.session.freeCount = 0;

  if (req.session.freeCount >= FREE_LIMIT) {
    // For web redirect to login; for API you might return 403
    return res.redirect("/login");
  }

  req.session.freeCount++;
  req.session.remaining = FREE_LIMIT - req.session.freeCount;
  next();
}

module.exports = freeLimit;
