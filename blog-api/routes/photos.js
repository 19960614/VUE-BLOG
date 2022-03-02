var express = require('express');
var router = express.Router();
let multer = require('multer');
let upload = multer({ dest: './public/uploads/' });
var { add, find, findPhotosCount, remove } = require('../controller/photos.js');

/* GET users listing. */
router.post('/add', upload.single('photosUrl'), add);
router.get('/find', find);
router.get('/findPhotosCount', findPhotosCount);
router.post('/remove', remove);

module.exports = router;
