const express = require('express');
const { handleShortLink } = require('../controllers/redirect');

const router = express.Router();

router.get("/:shortId", handleShortLink) ;

module.exports = router;
