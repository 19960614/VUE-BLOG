let mongoose = require('mongoose');

let settingSchema = mongoose.Schema({
    myName: { type: String }, //昵称
    myHead: { type: String }, //头像
    myTel: { type: String }, //电话
    myQQ: { type: String }, //QQ
    myMail: { type: String } //邮箱
})
let settingModel = mongoose.model('setting', settingSchema);

module.exports = settingModel;