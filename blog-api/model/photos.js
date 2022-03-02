let mongoose = require('mongoose');
let photosSchema = mongoose.Schema({
    photosUrl: { type: String },
})
let photosModel = mongoose.model('photos', photosSchema);
module.exports = photosModel;