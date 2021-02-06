var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    title: String,
    subtitle: String,
    desc: String, //Descricao
    type: String, // livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios, ...
    year: String,
    uc: String,
    visibility: String, //público: todos podem ver e descarregar,privado: apenas disponível para administradores e seu produtor
    dateCreation: String,
    rank: String,
    downloadName: String
})


module.exports = mongoose.model('recursos', recursoSchema)