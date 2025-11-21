const { getUser } = require("../services/auth");

// #### For cookies use only
// authentication
function checkforAuthentication(req, res, next) {
    // for cookiess
    const tokenCookie = req.cookies?.token;
    req.user = null;
    // check if not exits
    if(!tokenCookie) return next();
    // validation
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}
//authorization
function restrictTo(roles) {
    return (req, res, next) => {
        // user check
        if(!req.user) return res.redirect("/login");
        // role check
        if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}
// ####
module.exports = {
    checkforAuthentication,
    restrictTo,
}



// async function restrictToLoggedInUserOnly(req, res, next) {

//      // // for cookies
//     // const userUid = req.cookies?.uid;

//     if (!userUid) return res.redirect("/login");

//     // for headers 
//     const token = userUid.split('Bearer ')[1]; // Bearer 182ybdoh3rh03rih"
//     const user = getUser(token);

//     // // for cookies
//     // const user = getUser(userUid);

//     if (!user) return res.redirect("/login");
//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
    
//     // // for cookies method
//     // const userUid = req.cookies?.uid;

//     // for headers method
//     const userUid = req.headers.authorization;
//     const token = userUid.split('Bearer ')[1]; // Bearer 182ybdoh3rh03rih"

//     // // for cookies
//     // const user = getUser(userUid);

//     // for headers
//     const user = getUser(token);
//     req.user = user;
//     next();
// }
// #### For header use only
// function checkforAuthentication(req, res, next) {
//     // for headers
//     const tokenCookie = req.headers.authorization;
//     // check if not exits
//     if(!tokenCookie || !tokenCookie.startsWith('Bearer ')) {
//         return next();
//     }
//     // validation
//     const token = tokenCookie.split('Bearer ')[1];
//     const user = getUser(token);
//     req.user = user;
//     return next();
// }
// function restrictTo(roles) {
//     return (req, res, next) => {
//         // user check
//         if(!req.user) return res.redirect("/login");
//         // role check
//         if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
//     }
// }
// ####