// routes/options.js
const express = require("express");
const { Handleaccount } = require("../controllers/account");
const { checkforAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/create-file", checkforAuthentication, (req, res) => {
  return res.render("create-file", { user: req.user });
});

router.get("/save-urls", checkforAuthentication, (req, res) => {
  return res.render("save-urls", { user: req.user });
});

router.get("/see-more", checkforAuthentication, (req, res) => {
  return res.render("see-more", { user: req.user });
});

router.get("/setting", checkforAuthentication, (req, res) => {
  return res.render("setting", { user: req.user });
});

router.get("/account", checkforAuthentication, Handleaccount);

router.get("/notes", checkforAuthentication, (req, res) => {
  return res.render("notes", { user: req.user });
});

module.exports = router;
