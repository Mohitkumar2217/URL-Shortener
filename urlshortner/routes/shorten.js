const express = require('express');
const crypto = require('crypto');
const { loadLinks, saveLinks } = require('../utils/fileHandler');
const { isValidUrl } = require('../utils/validator');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    // Validate URL
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    // Load existing links
    const links = await loadLinks();

    // Generate short code if not provided
    const finalCode = shortCode || crypto.randomBytes(4).toString('hex');

    // Check for duplicate short code
    if (links[finalCode]) {
      return res.status(400).json({ error: 'Short code already taken' });
    }

    // Save new link
    links[finalCode] = url;
    await saveLinks(links);

    // Respond with success
    res.status(200).json({ success: true, shortCode: finalCode });

  } catch (err) {
    console.error('Error in /shorten:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;