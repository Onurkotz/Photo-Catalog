// CRUD processes with Mongoose

// For to create a database and to connect it.

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// Connect databas

// mongoose.connect('mongodb://localhost/pcat-test-db');

//  "pcat-test-db is" database name. In here, if you get any warning of "deprecation",
// add these:
//  useNewUrlParser: true,
//  useUnifiedTopology: true
//  after 'mongodb://localhost/pcat-test-db'

// Create a Schema

// const PhotoSchema = new Schema({
//   title: String,
//   description: String,
// });

// Create model (Model uses schema.)

// const Photo = mongoose.model('Photo', PhotoSchema);
// Mongo takes "Photo". Then minimizes and makes plural it. "photos". This is out collection name.

// Create a photo

// Photo.create({
//   title: 'Photograph 2',
//   description: 'First Data',
// });

// Read a photo

// Photo.find({}, (err, data) => {
//   console.log(data);
// });  // {} includes filter consitions.

// Update a photos

// const id = '633c12ce407d4ae1f6703db3';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'First Data',
//     description: 'Updated Datas',
//   },
//   {
//     new: true, // for to show updated data on console.
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// Delete a PhotoSchema

// const id = '633c12ce407d4ae1f6703db3';

// Photo.findByIdAndDelete(id, (err, data) => {
//   console.log('Photo was removed.');
// });
