let mongoose = require('mongoose');

let commentSchema = mongoose.Schema({
    commentId: { type: String }, //评论的文章id
    commentUser: { type: String }, //评论人的用户名
    commentContent: { type: String }, //评论内容
    commentYear: { type: String }, //评论年
    commentMonth: { type: String }, //评论月
    commentDay: { type: String }, //评论日
    commentHour: { type: String }, //评论时
    commentMinute: { type: String }, //评论分
})
let commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;