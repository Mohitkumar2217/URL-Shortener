const express = require("express");
const {handleLoadLink} = require("../controllers/shorturl");

const router = express.Router();

router.post('/', handleLoadLink);

module.exports = router;