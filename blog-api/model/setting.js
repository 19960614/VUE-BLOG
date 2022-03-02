let mongoose = require('mongoose');
let settingSchema = mongoose.Schema({
    myName: { type: String },
    myHead: { type: String },
    myTel: { type: String },
    myQQ: { type: String },
    myMail: { type: String }
})
let settingModel = mongoose.model('setting', settingSchema);
module.exports = settingModel;