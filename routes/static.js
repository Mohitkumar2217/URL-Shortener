const express = require('express');
const URL = require('../models/url');
const router = express.Router();
const {restrictTo} = require("../middlewares/auth");

router.get("/admin/urls",restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
});
router.get("/",restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,
    });
});
router.get("/", async (req, res) => {
    return res.render("home");
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
})

router.get("/login", async (req, res) => {
    return res.render("login");
})

// Server-side route (optional, for token blacklist)
router.get('/logout', async (req, res) => {
  res.clearCookie('token'); // token delete to logout
  return res.redirect('/login');
})

module.exports = router;