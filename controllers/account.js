const User = require("../models/user");

async function Handleaccount(req, res) {
  try {
    const userDoc = await User.findById(req.user._id);
    if (!userDoc) return res.redirect("/");

    const user = {
      name: userDoc.name || "",
      email: userDoc.email || "",
      role: userDoc.role || "NORMAL",
      createdAt: userDoc.createdAt,
    };

    res.render("account", {
      user,
      currentPage: 'account',
      pageTitle: 'Profile',
      breadcrumbs: [
        { label: 'Dashboard', href: '/' },
        { label: 'Profile', active: true },
      ],
    });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
}

async function HandleAccountUpdate(req, res) {
  try {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.user._id, { name, email });
    return res.redirect("/account");
  } catch (err) {
    console.error(err);
    return res.redirect("/account");
  }
}

module.exports = {
  Handleaccount,
  HandleAccountUpdate,
};
