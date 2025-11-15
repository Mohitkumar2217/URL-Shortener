// routes/posturl.js
const express = require("express");
const { handleLoadLink } = require("../controllers/shorturl");
const { checkforAuthentication } = require("../middlewares/auth");

const router = express.Router();

// Ensure req.user exists - index.js already applied restrictTo for /url POST
// but keep check here to be safe for direct use
router.post("/", checkforAuthentication, handleLoadLink);

module.exports = router;
