// controllers/redirect.js
const URL = require("../models/url");

async function handleShortLink(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(400).send("Invalid shortId");

    // push visit info and return updated doc
    const update = {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
          ip: req.ip || req.connection.remoteAddress,
          userAgent: req.headers["user-agent"] || "",
          referrer: req.get("referrer") || req.get("referer") || "",
        },
      },
    };

    const entry = await URL.findOneAndUpdate({ shortId }, update, { new: true }).lean();
    if (!entry) return res.status(404).send("Short link not found");

    if (!entry.redirectId) return res.status(500).send("Redirect URL not set");

    return res.redirect(entry.redirectId);
  } catch (err) {
    console.error("handleShortLink error:", err);
    return res.status(500).send("Internal server error");
  }
}

module.exports = { handleShortLink };
