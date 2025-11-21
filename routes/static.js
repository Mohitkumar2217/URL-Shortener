//routes/static.js

const express = require('express');
const URL = require('../models/url');
const router = express.Router();
const { checkforAuthentication, restrictTo } = require("../middlewares/auth");

// Admin: list all URLs (protected)
router.get(
    "/admin/urls",
    checkforAuthentication,
    restrictTo(['ADMIN']),
    async (req, res) => {
        try {
            const allUrls = await URL.find({}).limit(100); // add sensible limit/pagination
            return res.render("home", { urls: allUrls });
        } catch (err) {
            console.error("GET /admin/urls error:", err);
            return res.status(500).render("home", { error: "Server error" });
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
            const allUrls = await URL.find({ createdBy: req.user._id }).limit(100);
            return res.render("history", { urls: allUrls });
        } catch (err) {
            console.error("GET /history error:", err);
            return res.status(500).render("history", { error: "Server error" });
        }
    }
);

// Public pages
router.get("/", async (req, res) => {
    return res.render("home");
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

// Server-side route (optional, for token blacklist)
router.get('/logout', async (req, res) => {
    res.clearCookie('token'); // token delete to logout
    return res.redirect('/login');
});

module.exports = router;