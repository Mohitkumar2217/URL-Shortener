//routes/static.js

const express = require('express');
const UrlModel = require('../models/url'); // avoid shadowing global URL
const router = express.Router();
const { checkforAuthentication, restrictTo } = require("../middlewares/auth");

// Admin: list all URLs (protected)
router.get(
    "/admin/urls",
    checkforAuthentication,
    restrictTo(['ADMIN']),
    async (req, res) => {
        try {
            const allUrls = await UrlModel.find({}).limit(100);
            return res.render("home", { urls: allUrls, user: req.user || null });
        } catch (err) {
            console.error("GET /admin/urls error:", err);
            return res.status(500).render("home", { error: "Server error", user: req.user || null });
        }
    }
);

// History: only the current user's URLs (protected)
router.get(
    "/history",
    checkforAuthentication,
    restrictTo(['NORMAL', "ADMIN"]),
    async (req, res) => {
        try {
            const allUrls = await UrlModel.find({ createdBy: req.user._id }).limit(100);
            return res.render("history", { urls: allUrls, user: req.user || null });
        } catch (err) {
            console.error("GET /history error:", err);
            return res.status(500).render("history", { error: "Server error", user: req.user || null });
        }
    }
);

// Public home
router.get("/", checkforAuthentication, async (req, res) => {
    try {
        let urls = [];
        if (req.user) {
            urls = await UrlModel.find({ createdBy: req.user._id }).limit(50);
        }
        return res.render("home", {
            user: req.user || null,
            urls,
        });
    } catch (err) {
        console.error("GET / error:", err);
        return res.status(500).render("home", { error: "Server error", user: req.user || null, urls: [] });
    }
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

router.get('/logout', async (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.redirect('/login');
        });
    } else {
        res.clearCookie('token');
        return res.redirect('/login');
    }
});

module.exports = router;