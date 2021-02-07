// Controlador para o modelo Recurso

var Recurso = require('../models/recursos')

// Devolve a listar
module.exports.listar = () => {
    return Recurso
        .find()
        .exec()
}

//listar com contraints

module.exports.listarTypeUcYear = (t,u,y) => {
    return Recurso
        .find({type: t, uc: u, year: y})
        .exec()
}

module.exports.listarTypeUc = (t,u) => {
    return Recurso
        .find({type: t, uc:u})
        .exec()
}

module.exports.listarTypeYear = (t,y) => {
    return Recurso
        .find({type: t, year:y})
        .exec()
}

module.exports.listarUcYear = (u,y) => {
    return Recurso
        .find({uc:u, year:y})
        .exec()
}

module.exports.listarType = (t) => {
    return Recurso
        .find({type: t})
        .exec()
}

module.exports.listarUc = (u) => {
    return Recurso
        .find({uc: u})
        .exec()
}

module.exports.listarYear = (y) => {
    return Recurso
        .find({year: y})
        .exec()
}



module.exports.consultar = id => {
    return Recurso
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = t => {
    var novo = new Recurso(t)
    return novo.save()
}

module.exports.remover = function(id){
    return Recurso.deleteOne({_id: id})
}

module.exports.alterar = function(t){
    return Recurso.findByIdAndUpdate({_id: t._id}, t, {new: true})
}

module.exports.consultarDownload = d => {
    return Recurso
        .findOne({downloadName: d})
        .exec()
}