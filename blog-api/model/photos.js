let mongoose = require('mongoose');

let photosSchema = mongoose.Schema({
    photosUrl: { type: String } //照片url
})
let photosModel = mongoose.model('photos', photosSchema);

module.exports = photosModel;