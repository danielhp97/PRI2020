// Roteador do servidor API para o problema
var express = require('express');
var router = express.Router();
const Poste = require('../controllers/postes');


// Listar todos


router.get('/', (req, res) => {
  console.log('Get chegou ao sitio certo')
  Poste.listar()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Listar posts de certo recurso
router.get('/:idRecurso', (req,res) => {
  Poste.listarRecurso(req.params.idRecurso)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
})

// Consultar um
router.get('/:id', function(req, res) {
  Poste.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir um
router.post('/', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  Poste.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})



// Alterar um
router.put('/', function(req, res){
  Poste.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover um
router.delete('/:id', function(req, res) {
  Poste.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



module.exports = router;