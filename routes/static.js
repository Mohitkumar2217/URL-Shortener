const express = require('express');
const URL = require('../models/url');
const User = require('../models/user');
const router = express.Router();
const { restrictTo } = require("../middlewares/auth");
const { Handleaccount, HandleAccountUpdate } = require("../controllers/account");

router.get("/admin/urls", restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({}).populate('createdBy', 'name email');
    const totalClicks = allUrls.reduce((sum, u) => sum + u.visitHistory.length, 0);
    return res.render("admin", {
        urls: allUrls,
        totalClicks,
        totalUsers: await User.countDocuments(),
        currentPage: 'admin',
        pageTitle: 'Admin Dashboard',
        breadcrumbs: [{ label: 'Admin', active: true }],
    });
});

router.get("/", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", {
        urls: allUrls,
        currentPage: 'home',
        pageTitle: 'Dashboard',
        breadcrumbs: [{ label: 'Dashboard', active: true }],
    });
});

router.get("/signup", (req, res) => {
    if (req.user) return res.redirect("/");
    return res.render("signup", { pageTitle: 'Sign Up' });
});

router.get("/login", (req, res) => {
    if (req.user) return res.redirect("/");
    return res.render("login", { pageTitle: 'Login' });
});

router.get("/history", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const query = req.query.q || "";
    let filter = { createdBy: req.user._id };
    if (query) {
        filter = {
            createdBy: req.user._id,
            $or: [
                { shortId: { $regex: query, $options: 'i' } },
                { redirectId: { $regex: query, $options: 'i' } },
            ],
        };
    }
    const allUrls = await URL.find(filter).sort({ createdAt: -1 });
    return res.render("history", {
        urls: allUrls,
        searchQuery: query,
        currentPage: 'history',
        pageTitle: 'History',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'History', active: true },
        ],
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/login');
});

router.get("/create-file", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("create-file", {
        urls,
        currentPage: 'tools',
        pageTitle: 'Export URLs',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'Export', active: true },
        ],
    });
});

router.get("/save-urls", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("save-urls", {
        urls,
        currentPage: 'tools',
        pageTitle: 'Saved Links',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'Saved Links', active: true },
        ],
    });
});

router.get("/see-more", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    const urls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    const totalClicks = urls.reduce((sum, u) => sum + u.visitHistory.length, 0);
    const topLink = urls.reduce((top, u) =>
        u.visitHistory.length > (top?.visitHistory?.length || 0) ? u : top, null);
    return res.render("see-more", {
        urls,
        totalClicks,
        totalLinks: urls.length,
        topLink,
        currentPage: 'analytics',
        pageTitle: 'Analytics',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'Analytics', active: true },
        ],
    });
});

router.get("/setting", restrictTo(['NORMAL', "ADMIN"]), (req, res) => {
    return res.render("settings", {
        user: req.user,
        currentPage: 'settings',
        pageTitle: 'Settings',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'Settings', active: true },
        ],
    });
});

router.get("/account", restrictTo(['NORMAL', "ADMIN"]), Handleaccount);

router.post("/account", restrictTo(['NORMAL', "ADMIN"]), HandleAccountUpdate);

router.get("/notes", restrictTo(['NORMAL', "ADMIN"]), (req, res) => {
    return res.render("notes", {
        currentPage: 'notes',
        pageTitle: 'Notes',
        breadcrumbs: [
            { label: 'Dashboard', href: '/' },
            { label: 'Notes', active: true },
        ],
    });
});

router.get("/help", (req, res) => {
    return res.render("help", {
        currentPage: 'help',
        pageTitle: 'Help',
        breadcrumbs: [
            { label: 'Help', active: true },
        ],
    });
});

router.get("/faq", (req, res) => {
    return res.render("faq", {
        currentPage: 'faq',
        pageTitle: 'FAQ',
        breadcrumbs: [
            { label: 'FAQ', active: true },
        ],
    });
});

router.post("/clear-history", restrictTo(['NORMAL', "ADMIN"]), async (req, res) => {
    await URL.deleteMany({ createdBy: req.user._id });
    return res.redirect("/history");
});

module.exports = router;
