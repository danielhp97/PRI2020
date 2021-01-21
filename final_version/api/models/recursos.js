var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    id: String,
    tipo: String, // livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios, ...
    titulo: String,
    dataRegisto: String,
    visiblidade: String
    //storeLocation: String //?
})

module.exports = mongoose.model('recursos', recursoSchema)