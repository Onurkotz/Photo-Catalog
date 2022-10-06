const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // File upload:
const methodOverride = require('method-override'); // Manipulating POST method for as PUT and DELETE
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers'); // Import controllers
const pageController = require('./controllers/pageControllers');

const app = express();

//Connecting database
mongoose.connect('mongodb://localhost/pcat-test-db', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  //These all 3 are not necessary in new versions.
});

app.set('view engine', 'ejs'); // Tempelate engine for dynamic files.

// MIDDLEWARES

app.use(express.static('public')); // For create a server.
// For to end the getting requests. (for POST method) urlcoded captures data in the URL. .json() converts data that captured in the URL to json formot.
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload()); // File upload. encType="multipart/form-data" is necessary for uploads. Add this <form>.
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// ROUTES

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getDetailPage);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

// PORT

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} ile başlatıldı.`);
});
