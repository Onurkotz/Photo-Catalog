const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// File upload:
const fileUpload = require('express-fileupload');

const path = require('path');
const ejs = require('ejs');

const Photo = require('./models/Photo');

const app = express();

//Connecting database
mongoose.connect('mongodb://localhost/pcat-test-db');

// Tempelate engine for dynamic files.
app.set('view engine', 'ejs');

// MIDDLEWARES

// For create a server.
app.use(express.static('public'));

// For to end the getting requests. (for POST method) urlcoded captures data in the URL. .json() converts data that captured in the URL to json formot.
//app.use(express.urlencoded({ extend: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// File upload
app.use(fileUpload());
// encType="multipart/form-data" is necessary for uploads. Add this <form>.

// ROUTES

app.get('/', async (req, res) => {
  // Sending datas to index.
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  // Create data. "/photos" is action name of form. /image is name that necessary for file upload.
  console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');
});
// app.get('/photo/:id', async (req, res) => {
//   // Sending details to details page.
//   const photo = await Photo.findById(req.params.id);
//   res.render('photo', {
//     photo,
//   });
// });
// app.delete('/delete', async (req, res) => {
//   // Delete a photo
//   const photo = await Photo.findById(req.params.id)
//   await Photo.findByIdAndDelete(photo);
//   res.redirect('/')
// });

// PORT

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
