// controllers/account.js
const User = require("../models/user");

async function Handleaccount(req, res) {
  try {
    if (!req.user?._id) return res.redirect("/login");

    const userDoc = await User.findById(req.user._id).lean();
    if (!userDoc) return res.redirect("/");

    const user = {
      fullName: userDoc.name || "",
      email: userDoc.email || "",
      phone: userDoc.phone || "",
      linkedin: userDoc.linkedin || "",
      github: userDoc.github || "",
      twitter: userDoc.twitter || "",
      address: userDoc.address || "",
      city: userDoc.city || "",
      country: userDoc.country || "",
      dob: userDoc.dob || "",
      bio: userDoc.bio || "",
      website: userDoc.website || "",
    };

    return res.render("account", { user });
  } catch (err) {
    console.error("Handleaccount error:", err);
    return res.status(500).render("error", { error: "Unable to load account" });
  }
}

module.exports = { Handleaccount };
