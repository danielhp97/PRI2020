var mongoose = require('mongoose')

var posteSchema = new mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    resource_id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    dateCreation: String,
})


module.exports = mongoose.model('postes', posteSchema)