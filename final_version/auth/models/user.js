var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    level: String,
    tipo: String
})

module.exports = mongoose.model('user', userSchema)