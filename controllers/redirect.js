//controllers/redirect.js

const URL = require("../models/url");

async function handleShortLink(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    });
    res.redirect(entry.redirectId);
}

module.exports = {
    handleShortLink,
}