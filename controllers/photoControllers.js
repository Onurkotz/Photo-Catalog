const Photo = require('../models/Photo');
const fs = require('fs'); //Create a image file for database image.

exports.getAllPhotos = async (req, res) => {
  // Below code is for pagination.
  const page = req.query.page || 1;
  const photoPerPage = 3;
  const totalPhoto = await Photo.find().countDocuments();
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photoPerPage)
    .limit(photoPerPage);
  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhoto / photoPerPage),
  });

  // Below colde is just write index page and send data.
  /* const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  }); */

  // Sending all datas to index.
};

exports.getDetailPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });

  // Sending details to details page.
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });

  // Create data. "/photos" is action name of form. /image is name that necessary for file upload
  //console.log(req.files.image); this is for getting image detail
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/`);

  // Update photo. DON'T FORGET THAT IN FORM TAG => action="/photos/<%= photo._id %>?_method=PUT"
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');

  // Delete photo. As first remove the photo from folder and then remove it from database. DON'T FORGET THAT IN TAG => action or href="/photos/<%= photo._id %>?_method=DELETE"
};
