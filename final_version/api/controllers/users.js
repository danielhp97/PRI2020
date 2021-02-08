// Controlador para o modelo UserL

var UserL = require('../models/users')

// Devolve a lista
module.exports.listar = () => {
    return UserL
        .find()
        .exec()
}
//listar com contraints

module.exports.listarFiliationLevel = (f,l) => {
    return UserL
        .find({filiation: g, level: l})
        .exec()
}

module.exports.listarFiliation = (f) => {
    return UserL
        .find({filiation: f})
        .exec()
}

module.exports.listarLevel = (l) => {
    return UserL
        .find({level: l})
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

module.exports.alterarLastAcess = function(u){
    return UserL.findByIdAndUpdate({_id: u._id}, u.dateLastAcess)
}

