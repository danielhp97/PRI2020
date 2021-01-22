// Controlador para o modelo User

var User = require('../models/users')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return User
        .find()
        .exec()
}

module.exports.consultar = id => {
    return User
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = t => {
    var novo = new User(t)
    return novo.save()
}

module.exports.remover = function(id){
    return User.deleteOne({_id: id})
}

module.exports.alterar = function(t){
    return User.findByIdAndUpdate({_id: t._id}, t, {new: true})
}
