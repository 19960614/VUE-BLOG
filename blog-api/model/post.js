let mongoose = require('mongoose');
let postSchema = mongoose.Schema({
    company: { type: String, required: true },
    postname: { type: String, required: true },
    postcity: { type: String, required: true },
    postsalary: { type: String, required: true },
    posteducation: { type: String, required: true },
    postintroduce: { type: String, required: true },
    postinfo: { type: String, required: true },
    username: { type: String, required: true },
})
let postModel = mongoose.model('post', postSchema);
module.exports = postModel;