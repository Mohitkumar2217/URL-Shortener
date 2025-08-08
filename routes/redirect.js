const express = require('express');
const { loadLinks } = require('../utils/fileHandler');

const router = express.Router();

router.get('/:code', async (req, res) => {
  const links = await loadLinks();
  const originalUrl = links[req.params.code];

  if (originalUrl) {
    return res.redirect(originalUrl);
  }

  res.status(404).send('Short URL not found');
});

module.exports = router;