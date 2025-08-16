const express = require('express');
const URL = require('../models/url');
const router = express.Router();
const {restrictTo} = require("../middlewares/auth");

router.get("/",restrictTo(['NORMAL']), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,
    });
});
router.get("/shortner", async (req, res) => {
    return res.render("home");
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
})

router.get("/login", async (req, res) => {
    return res.render("login");
})

module.exports = router;