const express = require('express');
const { handleShortLink } = require('../controllers/redirect');
const { handleAnalyticLink } = require('../controllers/analytic');

const router = express.Router();

router.get("/:shortId", handleShortLink) ;
router.get("/analytic/:shortId", handleAnalyticLink);

module.exports = router;
