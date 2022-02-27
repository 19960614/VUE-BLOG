var express = require('express');
var controllerUser = require('../controller/users');
var router = express.Router();

/* GET users listing. */
router.post('/register', controllerUser.register);
router.post('/login', controllerUser.login);
router.get('/info', controllerUser.info);

module.exports = router;
