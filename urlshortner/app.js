const express = require('express');
const path = require("path");
const { log } = require('console');

const { readFile } = require('fs/promises');


const app = express();


app.use(express.json()); // for parsing JSON bodies

// app.use('/api', apiRoutes); // route mount

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));




// get method
app.get("/", (req, res) => {
    res.sendFile (path.resolve(__dirname,"public","URL.html"));
});

// fallback for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;