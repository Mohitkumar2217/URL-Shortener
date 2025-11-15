// controllers/user.js
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password, confirmpass } = req.body;

    if (!name || !email || !password || !confirmpass) {
      return res.status(400).render("signup", { error: "All fields are required" });
    }

    if (password !== confirmpass) {
      return res.status(400).render("signup", { error: "Passwords do not match" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).render("signup", { error: "Email already registered" });
    }

    await User.create({ name, email, password });

    return res.redirect("/login");
  } catch (err) {
    console.error("handleUserSignUp error:", err);
    return res.status(500).render("signup", { error: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", { error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).render("login", { error: "Invalid email or password" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).render("login", { error: "Invalid email or password" });

    const token = setUser(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.redirect("/");
  } catch (err) {
    console.error("handleUserLogin error:", err);
    return res.status(500).render("login", { error: "Internal server error" });
  }
}

module.exports = { handleUserSignUp, handleUserLogin };
