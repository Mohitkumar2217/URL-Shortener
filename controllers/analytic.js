//controllers/analytic.js

const URL = require("../models/url");

async function handleAnalyticLink(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleAnalyticLink,
}