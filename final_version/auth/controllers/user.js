// Controlador para o modelo User

var User = require('../models/user')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return User
        .find()
        .sort('username')
        .exec()
}

module.exports.consultar = name => {
    return User
        .findOne({username: name})
        .exec()
}

module.exports.inserir = t => {
    var novo = new User(t)
    return novo.save()
}

module.exports.remover = function(id){
    return User.deleteOne({_id: id})
}

module.exports.alterar = function(u){
    return User.findByIdAndUpdate({_id: u._id}, u, {new: true})
}
