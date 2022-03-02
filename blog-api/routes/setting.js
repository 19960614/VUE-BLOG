var express = require('express');
var router = express.Router();
let multer = require('multer');
let upload = multer({ dest: './public/uploads/' });
var { find, update } = require('../controller/setting.js');

/* GET users listing. */
router.get('/find', find);
router.patch('/update', upload.single('myHead'), update);

module.exports = router;
