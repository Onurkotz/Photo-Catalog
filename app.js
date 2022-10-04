const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

// Tempelate engine for dynamic files.

app.set('view engine', 'ejs');


// For create a server.

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
