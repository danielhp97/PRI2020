var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    id: String,
    nome: String,
    curso: String,
    tipo: String, // livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios, ...
    //storeLocation: String //?
})

module.exports = mongoose.model('users', userSchema)