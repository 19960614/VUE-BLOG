let UsersModel = require('../model/users.js');
let code = require('svg-captcha');
let login = (req, res, next) => {
    if (req.body.verify.toLowerCase() !== req.session.verify.toLowerCase()) {
        res.send({ 'errcode': -1 });
    }
    UsersModel.find({ username: req.body.username, password: req.body.password }).then((data) => {
        console.log(UsersModel.find({ username: req.body.username, password: req.body.password }))
        if (data.length) {
            req.session.username = req.body.username;
            res.send({ 'errcode': 1 });
        }
        else {
            res.send({ 'errcode': 0 });
        }
    })
};
let register = (req, res, next) => {
    UsersModel.insertMany([req.body]).then(() => {
        res.send({ 'errcode': 1 });
    }).catch(() => {
        res.send({ 'errcode': 0 });
    })
};
let logout = (req, res, next) => {
    req.session.username = '';
    res.redirect('/admin/login');
};
let verify = (req, res, next) => {
    let captcha = code.create({
        size: 6,
        noise: 4,
        width: 180,
        height: 60
    })
    req.session.verify = captcha.text;
    res.type('svg');
    res.send(captcha.data);
};
module.exports = {
    login,
    register,
    logout,
    verify
};