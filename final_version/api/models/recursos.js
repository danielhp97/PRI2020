var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    title: String,
    subtitle: String,
    desc: String,
    type: String,
    year: String,
    uc: String,
    visibility: String,
    rank: String,
    downloadName: String
    //author_name: String
})


module.exports = mongoose.model('recursos', recursoSchema)