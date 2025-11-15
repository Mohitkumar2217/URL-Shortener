// controllers/analytic.js
const URL = require("../models/url");

async function handleAnalyticLink(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(400).json({ error: "shortId required" });

    const result = await URL.findOne({ shortId }).lean();
    if (!result) return res.status(404).json({ error: "URL not found" });

    // Optionally restrict to owner/admin — not applied by default
    return res.json({
      totalClicks: result.visitHistory ? result.visitHistory.length : 0,
      analytics: result.visitHistory || [],
    });
  } catch (err) {
    console.error("handleAnalyticLink error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { handleAnalyticLink };
