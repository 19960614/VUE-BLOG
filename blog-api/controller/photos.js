let fs = require('fs');
let path = require('path');
let PhotosModel = require('../model/photos.js');

let add = (req, res, next) => {
    let photosImage = req.file;
    fs.renameSync(path.join('./public/uploads', photosImage.filename), path.join('./public/uploads', photosImage.filename + '.jpg'));
    let data = {
        photosUrl: 'http://localhost:3000/uploads/' + photosImage.filename + '.jpg'
    };
    PhotosModel.insertMany(data).then((info) => {
        if (info) {
            res.send({ "errcode": 0 });
        }
        else {
            res.send({ "errcode": -1 });
        }
    }).catch((err) => {
        res.send({ "errcode": -1 });
    });
};

let find = (req, res, next) => {
    PhotosModel.find().then((data) => {
        res.send({ 'errcode': 0, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let findPhotosCount = (req, res, next) => {
    PhotosModel.find(req.query).count().then((data) => {
        res.send({ 'errcode': 0, count: data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let remove = (req, res, next) => {
    PhotosModel.deleteOne({ "_id": req.body._id }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
    // PhotosModel.find({ "_id": id }).then((data) => {
    //     console.log(1234)
    // })
};

module.exports = {
    add,
    find,
    findPhotosCount,
    remove
};