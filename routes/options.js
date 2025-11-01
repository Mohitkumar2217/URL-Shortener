// routes/options.js
const express = require("express");
const router = express.Router();

router.get("/create-file", (req, res) => {
  res.send("Create File Page"); // replace with your EJS render
});

router.get("/save-urls", (req, res) => {
  res.send("Save Short URLs Page");
});

router.get("/see-more", (req, res) => {
  res.send("See More Page");
});

router.get("/setting", (req, res) => {
  res.send("Setting Page");
});

router.get("/account", (req, res) => {
  res.send("Account Page");
});

router.get("/notes", (req, res) => {
  res.send("Notes Page");
});

module.exports = router;
