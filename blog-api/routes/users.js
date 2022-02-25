var express = require('express');
var router = express.Router();
var { login, register, logout, verify } = require('../controller/users.js');
/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verify', verify);

module.exports = router;
