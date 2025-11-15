// routes/user.js
const express = require("express");
const { handleUserSignUp, handleUserLogin } = require("../controllers/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await handleUserSignUp(req, res);
  } catch (err) {
    console.error("Signup route error:", err);
    return res.status(500).render("signup", { error: "Failed to sign up" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await handleUserLogin(req, res);
  } catch (err) {
    console.error("Login route error:", err);
    return res.status(500).render("login", { error: "Login failed" });
  }
});

module.exports = router;
