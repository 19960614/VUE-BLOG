let fs = require('fs');
let path = require('path');
let SettingModel = require('../model/setting.js');

let find = (req, res, next) => {
    SettingModel.find().then((data) => {
        console.log(SettingModel,222)
        console.log(data,111)
        res.send({ 'errcode': 0, 'list': data });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};

let update = (req, res, next) => {
    let body = req.body;
    if (req.file) {
        SettingModel.find().then((data) => {
            let filePath = path.resolve(path.join('public', data[0].myHead.match(/\/uploads.+$/)[0]));
            fs.unlink(filePath, function (err) {
                if (err) {
                    console.log('删除文件失败');
                }
                else {
                    console.log('删除文件成功');
                }
            })
        })
        let myHead = req.file;
        fs.renameSync(path.join('./public/uploads', myHead.filename), path.join('./public/uploads', myHead.filename + '.jpg'));
        let data = {
            ...body,
            myHead: 'http://localhost:3000/uploads/' + myHead.filename + '.jpg'
        };
        SettingModel.updateOne({}, { $set: { "myName": data.myName, "myHead": data.myHead, "myTel": data.myTel, "myQQ": data.myQQ, "myMail": data.myMail } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
    else {
        SettingModel.updateOne({}, { $set: { "myName": body.myName, "myTel": body.myTel, "myQQ": body.myQQ, "myMail": body.myMail } }).then(() => {
            res.send({ 'errcode': 0 });
        }).catch(() => {
            res.send({ 'errcode': -1 });
        })
    }
};

module.exports = {
    find,
    update
};