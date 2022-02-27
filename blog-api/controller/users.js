let UsersModel = require('../model/users.js');
var jwt = require('jsonwebtoken');

let login = (req, res, next) => {
  UsersModel.find({ username: req.body.username, password: req.body.password }).then((data) => {
    if (data.length) {
      jwt.sign({ username: req.body.username }, 'woshinibaba', function (err, token) {
        res.send({ "errcode": 0, token }); //token正确返回0
      });
    }
    else {
      res.send({ 'errcode': -1 }); //登录失败返回-1
    }
  })
};

let register = (req, res, next) => {
  UsersModel.insertMany([req.body]).then(() => {
    res.send({ 'errcode': 0 }); //注册成功返回0
  }).catch(() => {
    res.send({ 'errcode': -1 }); //注册失败返回-1
  })
};

let info = (req, res, next) => {
  let token = req.headers.token;
  jwt.verify(token, 'woshinibaba', function (err, decoded) { //验证token是否是正确的
    if (err) {
      res.json({ //错误返回-1
        errcode: -1,
        errmsg: 'token错误'
      });
    }
    else {
      res.json({ //正确返回0
        errcode: 0,
        errmsg: 'token正确',
        username: decoded.username
      });
    }
  });
};

module.exports = {
  login,
  register,
  info
};