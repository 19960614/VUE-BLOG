let mongoose = require('mongoose');
let usersSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})
let usersModel = mongoose.model('users', usersSchema);
module.exports = usersModel;