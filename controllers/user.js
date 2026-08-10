// const {v4: uuidv4} = require("uuid");
// now do with token method
// now header method
const User = require("../models/user");
const {setUser} = require("../services/auth");

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
            return res.render("signup", { error: "Database connection failed. Check that MongoDB is running and MONGO_URI is set in .env." });
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

    if (!user || user.password !== password) {
        return res.render("login", {
            error: "Invalid email or password",
        });
    }

    const token = setUser(user);
    res.cookie("token", token);
    return res.redirect("/");
}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
}