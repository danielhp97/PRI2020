// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Poste = require('../controllers/postes');


// Listar todas
router.get('/', (req, res) => {
  Poste.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma
router.get('/:id', function(req, res) {
  Poste.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma
router.post('/', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  Poste.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})



// Alterar uma
router.put('/', function(req, res){
  Poste.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma
router.delete('/:id', function(req, res) {
  Poste.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



module.exports = router;