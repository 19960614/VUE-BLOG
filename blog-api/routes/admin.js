var express = require('express');
var router = express.Router();

// /* GET users listing. */

// router.get('/login', function (req, res, next) {
//   res.render('login');
// });
// router.get('/register', function (req, res, next) {
//   res.render('register');
// });
// router.use((req, res, next) => {
//   if (req.session.username) {
//     next();
//   }
//   else {
//     res.redirect('/admin/login');
//   }
// })
// router.get('/index', function (req, res, next) {
//   res.render('index', {
//     username: req.session.username,
//     active: ''
//   });
// });
// router.get('/postadd', function (req, res, next) {
//   res.render('postadd', {
//     username: req.session.username,
//     active: '添加职位'
//   });
// });
// router.get('/postlist', function (req, res, next) {
//   res.render('postlist', {
//     username: req.session.username,
//     active: '职位列表'
//   });
// });

module.exports = router;
