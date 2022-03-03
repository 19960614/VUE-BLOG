let fs = require('fs');
let path = require('path');
let ArticleModel = require('../model/article.js');
let CommentModel = require('../model/comment.js');
let ObjectId = require('mongodb').ObjectId; //与数据库默认的_id进行匹配

let add = (req, res, next) => {
    let body = req.body;
    let articleImage = req.file;
    if (req.file) { //如果传的数据有图片
        fs.renameSync(path.join('./public/uploads', articleImage.filename), path.join('./public/uploads', articleImage.filename + '.jpg'));
        let data = {
            ...body,
            articleImage: 'http://192.168.30.203:3000/uploads/' + articleImage.filename + '.jpg'
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
    else { //如果传的数据没有图片
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
    if (req.query.articleTitle) { //根据标题查找
        ArticleModel.find({ "articleTitle": eval('/' + req.query.articleTitle + '/') }).then((data) => { //正则里写变量要用eval
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else if (req.query._id) { //通过id查找
        let id = ObjectId(req.query._id);
        ArticleModel.find({ "_id": id }).then((data) => {
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else { //查找全部
        ArticleModel.find().then((data) => {
            res.send({ 'errcode': 0, 'list': data });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
};

let findArticleCount = (req, res, next) => { //查找数量
    ArticleModel.find(req.query).count().then((data) => {
        res.send({ 'errcode': 0, count: data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let remove = (req, res, next) => { //删除
    ArticleModel.find({ "_id": req.body._id }).then((data) => { //删除同时要把uploads里的文件也一并删除
        let filePath = path.resolve(path.join('public', data[0].articleImage.match(/\/uploads.+$/)[0])); //通过正则找到图片相对路径，用path转换为绝对路径，用fs.unlink删除文件
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

let removeComment = (req, res, next) => { //删除所有评论
    CommentModel.deleteMany({ "commentId": req.body._id }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let update = (req, res, next) => { //更新
    let body = req.body;
    let _id = req.body._id;
    if (req.file) { //如果传的数据有图片
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
        fs.renameSync(path.join('./public/uploads', articleImage.filename), path.join('./public/uploads', articleImage.filename + '.jpg')); //删除uploads下的旧图片
        let data = {
            ...body,
            articleImage: 'http://192.168.30.203:3000/uploads/' + articleImage.filename + '.jpg'
        };
        ArticleModel.updateOne({ _id }, { $set: { "articleTitle": data.articleTitle, "articleImage": data.articleImage, "articleContent": data.articleContent } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else { //如果传的数据没有图片
        ArticleModel.updateOne({ _id }, { $set: { "articleTitle": body.articleTitle, "articleContent": body.articleContent } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
};

module.exports = {
    add,
    find,
    findArticleCount,
    remove,
    removeComment,
    update
};