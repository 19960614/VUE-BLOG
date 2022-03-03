let CommentModel = require('../model/comment.js');
let ObjectId = require('mongodb').ObjectId; //与数据库默认的_id进行匹配

let addComment = (req, res, next) => { //添加评论
    let body = req.body;
    console.log(body)
    CommentModel.insertMany(body).then((info) => {
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

let findComment = (req, res, next) => { //查找
    CommentModel.find({ "commentId": req.query.commentId }).then((data) => {
        res.send({ 'errcode': 0, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let removeComment = (req, res, next) => { //删除
    CommentModel.deleteOne({ "_id": req.body }).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

module.exports = {
    addComment,
    findComment,
    removeComment
};