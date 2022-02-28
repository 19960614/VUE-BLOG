let fs = require('fs');
let path = require('path');
let ArticleModel = require('../model/article.js');

let add = (req, res, next) => {
    let body = req.body;
    console.log(body,111);
    let articleImage = req.file;
    fs.renameSync(path.join('./public/uploads', articleImage.filename), path.join('./public/uploads', articleImage.filename + '.jpg'));
    let data = {
        ...body,
        articleImage: 'http://localhost:3000/uploads/' + articleImage.filename + '.jpg'
    };
    console.log(data)
    ArticleModel.insertMany(data).then((info) => {
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
    ArticleModel.find(req.query).then((data) => {
        res.send({ 'errcode': 0, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};
let findArticleCount = (req, res, next) => {
    ArticleModel.find(req.query).count().then((data) => {
        res.send({ 'errcode': 0, count: data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let remove = (req, res, next) => {
    ArticleModel.deleteOne(req.body).then(() => {
        res.send({ 'errcode': 1 });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};

let update = (req, res, next) => {
    let _id = req.body._id;
    ArticleModel.updateOne({ _id }, { $set: req.body }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let updateComment = (req, res, next) => {
    let _id = req.body._id;
    console.log(typeof req.body.articleComment)
    ArticleModel.updateOne({ _id }, { $set: { articleComment: JSON.stringify(req.body.articleComment) } }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

module.exports = {
    add,
    find,
    findArticleCount,
    remove,
    update,
    updateComment
};