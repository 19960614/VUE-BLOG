var express = require('express');
var router = express.Router();
var { add, find, remove, update } = require('../controller/post.js');
/* GET users listing. */
router.post('/add', add);
router.get('/find', find);
router.post('/remove', remove);
router.post('/update', update);

module.exports = router;
