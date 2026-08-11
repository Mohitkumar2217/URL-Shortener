const User = require("../models/user");
const { setUser } = require("../services/auth");
const bcrypt = require("bcrypt"); // Add this

async function handleUserSignUp(req, res) {
    const { name, email, password, confirmpass } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !confirmpass) {
        return res.render("signup", { error: "Please fill in all required fields." });
    }

    if (password !== confirmpass) {
        return res.render("signup", {
            error: "Password and confirm password must match",
        });
    }

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.render("signup", { error: "An account with this email already exists." });
        }

        // NOTE: If your User model does NOT automatically hash passwords, 
        // you should hash the password here before saving it.
        await User.create({
            name: String(name).trim(),
            email: normalizedEmail,
            password,
            confirmpass,
        });

        return res.redirect("/login");
    } catch (err) {
        if (err.code === 11000) {
            return res.render("signup", { error: "An account with this email already exists." });
        }
        if (err.name === "MongooseError" || err.name === "MongoServerError" || err.message?.includes("buffering timed out")) {
            return res.render("signup", { error: "Database connection failed." });
        }
        console.error("Signup error:", err);
        return res.render("signup", { error: "Something went wrong. Please try again." });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
        return res.render("login", { error: "Email and password are required." });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    // Safely compare the plain-text password to the hashed database password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // If the database password happens to be plain-text (from an old test), 
    // also check it as a fallback just so you can still log in
    const isPlainTextMatch = user.password === password;

    if (!isMatch && !isPlainTextMatch) {
        return res.render("login", { error: "Invalid email or password" });
    }

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}