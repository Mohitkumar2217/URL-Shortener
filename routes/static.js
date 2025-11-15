// routes/static.js
const express = require("express");
const URL = require("../models/url");
const { restrictTo, checkforAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", checkforAuthentication, restrictTo(["ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("admin-urls", { urls: allUrls, user: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", { error: "Server Error" });
  }
});

router.get("/history", checkforAuthentication, restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("history", { urls: allUrls, user: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).render("error", { error: "Server Error" });
  }
});

router.get("/", (req, res) => {
  return res.render("home", { user: req.user });
});

router.get("/signup", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("login");
});

router.get("/logout", checkforAuthentication, (req, res) => {
  res.clearCookie("token");
  if (req.session) req.session.destroy(() => {});
  return res.redirect("/login");
});

module.exports = router;
