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
    PhotosModel.find({ "_id": req.body._id }).then((data) => {
        let filePath = path.resolve(path.join('public', data[0].photosUrl.match(/\/uploads.+$/)[0]));
        fs.unlink(filePath, function (err) {
            if (err) {
                console.log('删除文件失败');
            }
            else {
                console.log('删除文件成功');
            }
        })
    })
    PhotosModel.deleteOne({ "_id": req.body._id }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

module.exports = {
    add,
    find,
    findPhotosCount,
    remove
};