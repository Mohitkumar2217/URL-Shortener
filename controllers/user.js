// const {v4: uuidv4} = require("uuid");
// now do with token method
// now header method
const User = require("../models/user");
const {setUser} = require("../services/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password, confirmpass } = req.body;
    if (password !== confirmpass) {
        return res.render("signup", {
            error: "Password and confirm password must match",
        });
    }
    try {
        await User.create({ name, email, password, confirmpass });
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
    const user = await User.findOne({
        email,
        password,
    });
    if(!user) return res.render("login", {
        error: "Invalid Username or Passwaord"
    })
    // // session id creating method 
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("uid", sessionId);

    const token = setUser(user);
    
    // cookies MDN check for multiple argumet
    res.cookie("token", token);
    return res.redirect("/");

    // // headers MDN check
    // return res.json({ token });
}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
}