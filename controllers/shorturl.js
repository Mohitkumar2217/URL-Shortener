const {nanoid} = require("nanoid");
const URL = require("../models/url");

async function handleLoadLink(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: "url is required"});
    const shortID = nanoid(8);
    try {
        await URL.create({
            shortId: shortId,
            redirectId: body.url,
            visitHistory: [],
        })
        return res.status(201).json({ id: shortID });
    }
    catch(error) {
        return res.status(500).json({ msg: `error: ${error}` })
    }
}

module.exports = {
    handleLoadLink,
}