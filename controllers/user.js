// controllers/user.js
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { setUser } = require("../services/auth");

const COOKIE_OPTS = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
};

async function handleUserSignUp(req, res) {
    try {
        const { name, email, password, confirmpass } = req.body;

        if (!name || !email || !password || !confirmpass) {
            return res.render("signup", { error: "All fields are required" });
        }

        if (password !== confirmpass) {
            return res.render("signup", { error: "Password and confirm password must match" });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.render("signup", { error: "Email already registered" });
        }

        const hash = await bcrypt.hash(password, 10);
        const created = await User.create({
            name,
            email,
            password: hash,
        });

        // Prefer session-based login if your app uses express-session:
        if (req.session) {
            req.session.userId = created._id;
            req.session.role = created.role || "NORMAL";
        } else if (typeof setUser === "function") {
            // fallback to token-style setUser if your service provides it
            const token = setUser(created);
            res.cookie("token", token, COOKIE_OPTS);
        }

        return res.redirect("/");
    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).render("signup", { error: "Server error" });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render("login", { error: "Email and password required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.render("login", { error: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render("login", { error: "Invalid email or password" });
        }

        if (req.session) {
            req.session.userId = user._id;
            req.session.role = user.role || "NORMAL";
            // ensure session is persisted before redirecting
            return req.session.save(err => {
                if (err) console.error("session save error:", err);
                return res.redirect("/");
            });
        } else if (typeof setUser === "function") {
            const token = setUser(user);
            res.cookie("token", token, COOKIE_OPTS);
        }

        return res.redirect("/");
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).render("login", { error: "Server error" });
    }
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}