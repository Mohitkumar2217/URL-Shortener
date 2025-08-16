const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    // // for cookies
    // const userUid = req.cookies?.uid;
    // for headers
    const userUid = req.headers["Authorization"];
    if(!userUid) return res.redirect("/login");

    // for headers 
    const token = userUid.split("Bearer ")[1]; // Bearer 182ybdoh3rh03rih"

    
    const user = getUser(userUid);

    if(!user) return res.redirect("/login"); 
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}