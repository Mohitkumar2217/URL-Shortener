const User = require("../models/user");

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
    return res.redirect("/shortner");
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
    return res.redirect("/");
}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
}