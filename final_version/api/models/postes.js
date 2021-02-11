var mongoose = require('mongoose')

var posteSchema = new mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    resource_id: mongoose.Schema.Types.ObjectId,
    authoruname: String,
    title: String,
    body: String,
    dateCreation: Date
})


module.exports = mongoose.model('postes', posteSchema)