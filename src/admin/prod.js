const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/health', function(req, res) {
  res.status(200).send('OK');
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 9000;

/* eslint-disable */
app.listen(port, function(err) {
  if (err) {
    console.error('The Static server cannot run failed by error ', err);
  }

  console.log('The static server is running on port ', port);
});
