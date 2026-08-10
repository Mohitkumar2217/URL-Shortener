const URL = require("../models/url");

async function handleShortLink(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );
    if (!entry) return res.status(404).render("404", { pageTitle: 'Not Found' });
    return res.redirect(entry.redirectId);
}

module.exports = {
    handleShortLink,
}
