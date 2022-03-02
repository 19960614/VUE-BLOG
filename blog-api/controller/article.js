let fs = require('fs');
let path = require('path');
let ArticleModel = require('../model/article.js');
let ObjectId = require('mongodb').ObjectId;

let add = (req, res, next) => {
    let body = req.body;
    let articleImage = req.file;
    if (req.file) {
        fs.renameSync(path.join('./public/uploads', articleImage.filename), path.join('./public/uploads', articleImage.filename + '.jpg'));
        let data = {
            ...body,
            articleImage: 'http://localhost:3000/uploads/' + articleImage.filename + '.jpg'
        };
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
    }
    else {
        ArticleModel.insertMany(body).then((info) => {
            if (info) {
                res.send({ "errcode": 0 });
            }
            else {
                res.send({ "errcode": -1 });
            }
        }).catch((err) => {
            res.send({ "errcode": -1 });
        });
    }
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
        ArticleModel.find({ "_id": id }).then((data) => {
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
    ArticleModel.find({ "_id": req.body._id }).then((data) => {
        let filePath = path.resolve(path.join('public', data[0].articleImage.match(/\/uploads.+$/)[0]));
        fs.unlink(filePath, function (err) {
            if (err) {
                console.log('删除文件失败');
            }
            else {
                console.log('删除文件成功');
            }
        })
    })
    ArticleModel.deleteOne({ "_id": req.body._id }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let update = (req, res, next) => {
    let body = req.body;
    let _id = req.body._id;
    if (req.file) {
        ArticleModel.find({ "_id": req.body._id }).then((data) => {
            let filePath = path.resolve(path.join('public', data[0].articleImage.match(/\/uploads.+$/)[0]));
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log('删除文件失败');
                }
                else {
                    console.log('删除文件成功');
                }
            })
        })
        let articleImage = req.file;
        fs.renameSync(path.join('./public/uploads', articleImage.filename), path.join('./public/uploads', articleImage.filename + '.jpg'));
        let data = {
            ...body,
            articleImage: 'http://localhost:3000/uploads/' + articleImage.filename + '.jpg'
        };
        ArticleModel.updateOne({ _id }, { $set: { "articleTitle": data.articleTitle, "articleImage": data.articleImage, "articleContent": data.articleContent } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else {
        ArticleModel.updateOne({ _id }, { $set: { "articleTitle": body.articleTitle, "articleContent": body.articleContent } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
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