const { getUser } = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    // // for cookies
    // const userUid = req.cookies?.uid;
    // for headers
    const userUid = req.headers["Authorization"];
    if(!userUid) return res.redirect("/login");

    // for headers 
    const token = userUid.split("Bearer ")[1]; // Bearer 182ybdoh3rh03rih"
    // // for cookies
    // const user = getUser(userUid);
    
    if(!user) return res.redirect("/login"); 
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    // // for cookies method
    // const userUid = req.cookies?.uid;
    // for headers method
    const userUid = req.headers["Authorization"];
    const token = userUid.split("Bearer ")[1]; // Bearer 182ybdoh3rh03rih"
    // // for cookies
    // const user = getUser(userUid);
    
    // for headers
    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}