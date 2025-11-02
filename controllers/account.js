const express = require("express");
const User = require("../models/user");
const { isAuthenticated } = require("../middlewares/auth");

async function Handleaccount(req, res) {
  try {
    // fetch user from DB
    const userDoc = await User.findById(req.user._id);

    if (!userDoc) {
      return res.redirect("/"); // fallback if user not found
    }

    // Prepare user data for EJS
    const user = {
      fullName: userDoc.fullName || "",
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

    // Pass user object to EJS
    res.render("account", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

module.exports = {
  Handleaccount,
};
