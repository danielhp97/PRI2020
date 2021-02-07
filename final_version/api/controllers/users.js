// Controlador para o modelo UserL

var UserL = require('../models/users')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return UserL
        .find()
        .exec()
}

module.exports.consultar = id => {
    return UserL
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = u => {
    var novo = new UserL(u)
    return novo.save()
}

module.exports.remover = function(id){
    return UserL.deleteOne({_id: id})
}

module.exports.alterar = function(u){
    return UserL.findByIdAndUpdate({_id: u._id}, u, {new: true})
}

