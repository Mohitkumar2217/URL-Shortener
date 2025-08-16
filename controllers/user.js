// const {v4: uuidv4} = require("uuid");
// now do with token method
// now header method
const User = require("../models/user");
const {setUser} = require("../services/auth");

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