let mongoose = require('mongoose');
let articleSchema = mongoose.Schema({
    articleTitle: { type: String },
    articleImage: { type: String },
    articleContent: { type: String },
    articleYear: { type: String },
    articleMonth: { type: String },
    articleDay: { type: String },
    articleHour: { type: String },
    articleMinute: { type: String },
    articleComment: { type: Array },
})
let articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;