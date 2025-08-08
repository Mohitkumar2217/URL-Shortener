const express = require('express');
const path = require('path');
const shortenRoute = require('./routes/shorten');
const redirectRoute = require('./routes/redirect');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'URL.html'));
}); 

app.get('/about', (req, res) => {
  return res.send("about page");
})

app.use('/shorten', shortenRoute);
app.use('/', redirectRoute);

module.exports = app;