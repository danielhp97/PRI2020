// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recursos')
const User = require('../controllers/users');
//var admZip = require('adm-zip')
//const Libxml = require('node-libxml');
//let libxml = new Libxml();

// ------------------------------------------------ user
router.get('/', (req, res) => {
    User.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
});

router.get('(\/[A-Z]+[0-9]+)', function(req, res) {
  var idUser = req.url.split("/")[1]
  User.consultar(idUser)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.put('/', function(req, res){
  User.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Remover uma tarefa
router.delete('/:id', function(req, res) {
  User.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/', (req, res) => {
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;