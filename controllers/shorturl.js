// controllers/shorturl.js
const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleLoadLink(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });

    // Validate URL (using URL constructor)
    try {
      new URL(url);
    } catch {
      return res.status(400).render("home", { error: "Invalid URL", user: req.user });
    }

    if (!req.user?._id) {
      // If your app allows anonymous creation, you can set createdBy: null
      return res.redirect("/login");
    }

    // create unique shortId, retry a couple times if collision (very unlikely)
    let shortID = nanoid(8);
    let tries = 0;
    while (tries < 3) {
      try {
        await URL.create({
          shortId: shortID,
          redirectId: url,
          visitHistory: [],
          createdBy: req.user._id,
        });
        break;
      } catch (err) {
        if (err.code === 11000) {
          shortID = nanoid(8);
          tries++;
        } else {
          throw err;
        }
      }
    }

    return res.status(201).render("home", { id: shortID, user: req.user });
  } catch (err) {
    console.error("handleLoadLink error:", err);
    return res.status(500).render("home", { error: "Failed to create short URL", user: req.user });
  }
}

module.exports = { handleLoadLink };
