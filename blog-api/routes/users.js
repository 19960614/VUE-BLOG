// var express = require('express');
// var router = express.Router();
// var { login, register, logout, info } = require('../controller/users.js');
// /* GET users listing. */
// router.post('/register', register);
// router.post('/login', login);
// router.get('/logout', logout);
// router.get('/info', info);

// module.exports = router;

var express = require('express');
var controllerUser = require('../controller/users');
var router = express.Router();

/* GET users listing. */
router.post('/login', controllerUser.login);
router.post('/register', controllerUser.register);
router.get('/info', controllerUser.info);
router.get('/logout', controllerUser.logout);

module.exports = router;
