const express = require('express');
const crypto = require('crypto');
const { loadLinks, saveLinks } = require('../utils/fileHandler');
const { isValidUrl } = require('../utils/validator');

const router = express.Router();

router.post('/', async (req, res) => {
  const { url, shortCode } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).send('Invalid or missing URL');
  }

  const links = await loadLinks();
  const finalCode = shortCode || crypto.randomBytes(4).toString('hex');

  if (links[finalCode]) {
    return res.status(400).send('Short code already taken');
  }

  links[finalCode] = url;
  await saveLinks(links);

  res.json({ success: true, shortCode: finalCode });
});

module.exports = router;