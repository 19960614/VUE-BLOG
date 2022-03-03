var express = require('express');
var router = express.Router();
var { addComment, findComment, removeComment } = require('../controller/comment.js');

/* GET users listing. */
router.post('/addComment', addComment);
router.get('/findComment', findComment);
router.post('/removeComment', removeComment);

module.exports = router;
