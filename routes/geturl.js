// routes/geturl.js
const express = require("express");
const { handleShortLink } = require("../controllers/redirect");
const { handleAnalyticLink } = require("../controllers/analytic");
const { checkforAuthentication, restrictTo } = require("../middlewares/auth");

const router = express.Router();

// Specific routes first
router.get("/analytic/:shortId", checkforAuthentication, restrictTo(["ADMIN"]), handleAnalyticLink);

// Redirect route (public)
router.get("/:shortId", handleShortLink);

module.exports = router;
