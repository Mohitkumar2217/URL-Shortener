const express = require("express");
const {handleLoadLink} = require("../controllers/shorturl");

const router = express.Router();

router.post('/', async (req, res) => {
    req.handleLoadLink
})

module.exports = router;