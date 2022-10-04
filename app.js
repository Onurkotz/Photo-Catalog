const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();

// Tempelate engine for dynamic files.

app.set('view engine', 'ejs');

// MIDDLEWARES

// For create a server.
app.use(express.static('public'));

// For to end the getting requests. (for POST method) urlcoded captures data in the URL. .json() converts data that captured in the URL to json formot.
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', (req, res) => {
  console.log(req.body);
  res.redirect('/')
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
