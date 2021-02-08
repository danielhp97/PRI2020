// Controlador para o modelo UserL

var Poste = require('../models/postes')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return Poste
        .find()
        .sort('-dateCreation')
        .exec()
}

module.exports.listarRecurso = (r) => {
    return Poste
        .find({resource_id: r})
        .sort('-dateCreation')
        .exec()
}

module.exports.consultar = id => {
    return Poste
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = p => {
    var novo = new Poste(p)
    return novo.save()
}

module.exports.remover = function(id){
    return Poste.deleteOne({_id: id})
}


