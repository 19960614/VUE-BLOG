let UsersModel = require('../model/users.js');
var jwt = require('jsonwebtoken');
let login = (req, res, next) => {
    UsersModel.find({ username: req.body.username, password: req.body.password }).then((data) => {
        if (data.length) {
            // req.session.username = req.body.username;
            jwt.sign({ username : req.body.username }, 'abcdef', function(err, token) {
                res.send({"errcode": 0, token});   //正确
              });
            // res.send({ 'errcode': 0, 'session': req.session.username });
        }
        else {
            res.send({ 'errcode': -1 });
        }
    }) 
};
let register = (req, res, next) => {
    UsersModel.insertMany([req.body]).then(() => {
        res.send({ 'errcode': 0 });
    }).catch(() => {
        res.send({ 'errcode': -1 });
    })
};
let logout = (req, res, next) => {
    req.session.username = '';
    res.redirect('/admin/login');
};
let info = (req, res, next) => {
    console.log(123)
    let token = req.headers.token;
    jwt.verify(token, 'abcdef', function(err, decoded) {
      if(err){
        res.json({
          code : -1,
          errmsg : 'token错误'
        });
      }
      else{
        res.json({
          code : 0,
          errmsg : 'token正确',
          username : decoded.username
        });
      }
    });
  };
module.exports = {
    login,
    register,
    logout,
    info
};