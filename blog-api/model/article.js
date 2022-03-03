let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    articleTitle: { type: String }, //标题
    articleImage: { type: String }, //封面
    articleContent: { type: String }, //内容
    articleYear: { type: String }, //发布年
    articleMonth: { type: String }, //发布月
    articleDay: { type: String }, //发布日
    articleHour: { type: String }, //发布时
    articleMinute: { type: String }, //发布分
})
let articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;