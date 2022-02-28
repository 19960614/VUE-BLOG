var express = require('express');
var router = express.Router();
let multer = require('multer');
let upload = multer({ dest: './public/uploads/' });
var { add, find, findArticleCount, remove, update, updateComment } = require('../controller/article.js');

/* GET users listing. */
router.post('/add', upload.single('articleImage'), add);
router.get('/find', find);
router.get('/findArticleCount', findArticleCount);
router.post('/remove', remove);
router.post('/update', upload.single('articleImage'), update);
router.patch('/updateComment', updateComment)

module.exports = router;
