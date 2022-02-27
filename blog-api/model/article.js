let mongoose = require('mongoose');
let articleSchema = mongoose.Schema({
    articleTitle: { type: String, required: true },
    articleType: { type: String, required: true },
    articleImage: { type: String, required: true },
    articleContent: { type: String, required: true },
    articleYear: { type: Number, required: true },
    articleMonth: { type: Number, required: true },
    articleDay: { type: Number, required: true },
    articleHour: { type: Number, required: true },
    articleMinute: { type: Number, required: true },
})
let articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;