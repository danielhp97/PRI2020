// Roteador do servidor API para o problema
var express = require('express');
var router = express.Router();
const User = require('../controllers/users');
//var admZip = require('adm-zip')
//const Libxml = require('node-libxml');
//let libxml = new Libxml();

// ------------------------------------------------ user

router.get('/:id', function(req, res) {
  console.log('Consultar o utilizardor com id'+req.params.id)
  User.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.get('/', (req, res) => {

  if (req.query.filiation && req.query.level) {
    User.listarFiliationLevel(req.query.filiation, req.query.level)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.filiation) {
    User.listarFiliation(req.query.filiation)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.level) {
    User.listarLevel(req.query.level)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }else{
    User.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
    }
});

router.get('/detalhe/:id', function(req, res) {
  var url = req.url.split("/")[2]
  var idUser = url.split("?")[0]
  console.log(idUser)
  User.consultar(idUser)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});


router.put('/', function(req, res){
  var url = req.url.split("/")[1]
  var idUser = url.split("?")[0]
  User.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});


// Remover uma tarefa
router.delete('/:id', function(req, res) {
  var url = req.url.split("/")[1]
  var idUser = url.split("?")[0]
  User.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/', (req, res) => {
  console.log('req body: ' + JSON.stringify(req.body))
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
