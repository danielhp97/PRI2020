var mongoose = require('mongoose')

var recursoSchema = new mongoose.Schema({
    author: {
              //mongoose.ObjectId
        type: mongoose.Schema.Types.ObjectId, ref :'users '// here you set the author ID
                                              // from the Author colection, 
                                              // so you can reference it
       // , required: true
      },
    tipo: String, // livros, artigos, aplicações, trabalhos de alunos, monografias, relatórios, ...
    titulo: String,
    dataRegisto: String,
    curso: String
})

module.exports = mongoose.model('recursos', recursoSchema)