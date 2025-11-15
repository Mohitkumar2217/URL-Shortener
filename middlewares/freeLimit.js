function freeLimit(req, res, next) {
  // Allow unlimited if logged in
  if (req.user) return next();

  // Initialize counter
  if (!req.session.freeCount) req.session.freeCount = 0;

  // Stop if limit reached
  if (req.session.freeCount >= 5) {
    return res.redirect("/user/login");
  }

  // Increment + track remaining
  req.session.freeCount++;
  req.session.remaining = 5 - req.session.freeCount;

  next();
}

module.exports = freeLimit;
