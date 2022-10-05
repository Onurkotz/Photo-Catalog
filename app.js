const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// File upload:
const fileUpload = require('express-fileupload');
// Manipulating POST method for as PUT and DELETE
const methodOverride = require('method-override');

//Create a image file for database image.
const fs = require('fs');
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

// File upload. encType="multipart/form-data" is necessary for uploads. Add this <form>.
app.use(fileUpload());

app.use(methodOverride('_method'));

// ROUTES

app.get('/', async (req, res) => {
  // Sending datas to index.
  const photos = await Photo.find({}).sort('-dateCreated');
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

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit', {
    photo,
  });
});

app.post('/photos', async (req, res) => {
  // Create data. "/photos" is action name of form. /image is name that necessary for file upload
  //console.log(req.files.image); this is for getting image detail
    const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});

app.get('/photo/:id', async (req, res) => {
  // Sending details to details page.
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.put('/photos/:id', async (req, res) => {
  // Update photo. DON'T FORGET THAT IN FORM TAG => action="/photos/<%= photo._id %>?_method=PUT"
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  
  res.redirect(`/`); 
  
});

// PORT

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
