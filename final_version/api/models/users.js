var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    filiation: String, //estudante, professor
    level: String, //admin, producer, consumer
    dateRegister: String,
    dateLastAcess: String
})

module.exports = mongoose.model('users', userSchema)

/* 
   Administrador - tem acesso a todas as operações;
   Produtor (autor de recurso) - pode consultar tudo e executar todas as operações sobre os recursos de que é produtor/autor
   Consumidor - pode consultar e descarregar os recursos públicos
*/