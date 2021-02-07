// Controlador para o modelo UserL

var Poste = require('../models/postes')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return Poste
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Poste
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = t => {
    var novo = new Poste(p)
    return novo.save()
}

module.exports.remover = function(id){
    return Poste.deleteOne({_id: id})
}

module.exports.alterar = function(p){
    return Poste.findByIdAndUpdate({_id: p._id}, p, {new: true})
}

