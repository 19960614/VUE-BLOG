let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true }, //用户名
    password: { type: String, required: true } //密码
})

let usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

