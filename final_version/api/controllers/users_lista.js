// Controlador para o modelo UserL

var UserL = require('../models/users_lista')

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

module.exports.inserir = t => {
    var novo = new UserL(t)
    return novo.save()
}

module.exports.remover = function(id){
    return UserL.deleteOne({_id: id})
}

module.exports.alterar = function(t){
    return UserL.findByIdAndUpdate({_id: t._id}, t, {new: true})
}
