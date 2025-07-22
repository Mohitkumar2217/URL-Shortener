const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/links.json');

const loadLinks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    if (!data.trim()) {
      // File is empty — initialize it
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw err;
  }
};

const saveLinks = async (links) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(links));
};

module.exports = { loadLinks, saveLinks };