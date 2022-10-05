const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Photo = require('./models/Photo');

const app = express();


//Connecting database
mongoose.connect('mongodb://localhost/pcat-test-db')

// Tempelate engine for dynamic files.
app.set('view engine', 'ejs');

// MIDDLEWARES

// For create a server.
app.use(express.static('public'));

// For to end the getting requests. (for POST method) urlcoded captures data in the URL. .json() converts data that captured in the URL to json formot.
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/')
});



const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
