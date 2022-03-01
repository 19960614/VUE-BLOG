let fs = require('fs');
let path = require('path');
let ArticleModel = require('../model/article.js');
let ObjectId = require('mongodb').ObjectId;

let add = (req, res, next) => {
    let body = req.body;
    console.log(body, 111);
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
    if (req.query.articleTitle) {
        ArticleModel.find({ "articleTitle": eval('/' + req.query.articleTitle + '/') }).then((data) => {
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else if (req.query._id) {
        let id = ObjectId(req.query._id);
        console.log(1111111, id) //这里走了
        ArticleModel.find({ "_id": id }).then((data) => {
            console.log(2222222, data) //这里走了，也找到对应数据了
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else {
        ArticleModel.find().then((data) => {
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
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