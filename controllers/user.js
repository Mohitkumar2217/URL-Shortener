const {v4: uuidv4} = require("uuid");
const User = require("../models/user");
const {setUser} = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { name, email, password,confirmpass } = req.body;
    await User.create({
        name,
        email,
        password,
        confirmpass,
    });
    if(password != confirmpass) return res.render("signup", {
        error: "fill password and confirm password same",
    })
    return res.redirect("/login");
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
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/test");
}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
}