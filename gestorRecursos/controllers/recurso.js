var Recurso = require('../models/recurso')

module.exports.listar = () => {
    return Recurso
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Recurso
        .findOne({id: id})
        .exec()
}

module.exports.inserir = r =>{
    var novo = new Recurso(r)
    return novo.save()
}