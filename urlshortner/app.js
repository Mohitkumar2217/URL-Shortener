const express = require('express');
const path = require('path');
const shortenRoute = require('./routes/shorten');
const redirectRoute = require('./routes/redirect');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/shorten', shortenRoute);
app.use('/', redirectRoute);

module.exports = app;