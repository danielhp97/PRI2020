var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    id: String,
    tipo: String,
    titulo: String,
    dataRegisto: String,
    visiblidade: String,
    storeLocation: String //?
})

module.exports = mongoose.model('Recurso', recursoSchema, 'recurso')