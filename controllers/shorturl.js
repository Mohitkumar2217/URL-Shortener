//controllers/shorturl.js

const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleLoadLink(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectId: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    return res.status(201).render("home", { 
        id: shortID, 
    });
}


module.exports = {
    handleLoadLink,
}