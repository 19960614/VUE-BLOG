let mongoose = require('mongoose');

let usersSchema = mongoose.Schema({ //数据库字段
    username: { type: String, unique: true, required: true }, //用户名必填，唯一值
    password: { type: String, required: true } //密码必填
})

let usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;

