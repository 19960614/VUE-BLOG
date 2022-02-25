let PostModel = require('../model/post.js')
let add = (req, res, next) => {
    PostModel.insertMany([req.body]).then(() => {
        res.send({ 'errcode': 1 });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};
let find = (req, res, next) => {
    PostModel.find(req.query).then((data) => {
        res.send({ 'errcode': 1, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};
let remove = (req, res, next) => {
    PostModel.deleteOne(req.body).then(() => {
        res.send({ 'errcode': 1 });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};
let update = (req, res, next) => {
    let _id = req.body._id;
    PostModel.updateOne({ _id }, { $set: req.body }).then(() => {
        res.send({ 'errcode': 1 });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};
module.exports = {
    add,
    find,
    remove,
    update
};