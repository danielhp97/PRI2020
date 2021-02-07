// Roteador do servidor API para o problema
var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recursos')
//var admZip = require('adm-zip')
//const Libxml = require('node-libxml');
//let libxml = new Libxml();

// ------------------------------------------------ recurso
// Listar todas
router.get('/', (req, res) => {
  Recurso.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

/*
router.get('/istonaoenada' function (req, res, next) {
  if (req.query.uc && req.query.year) {
    User.listbyNameCourse(req.query.name, req.query.course)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.name) {
    User.listbyName(req.query.name)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.course) {
    User.listbyCourse(req.query.course)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else {
    User.list()
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
*/


// Consultar uma
router.get('/:id', function(req, res) {
  Recurso.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar download
router.get('/download/:downloadName', function(req, res) {
  Recurso.consultarDownload(req.params.downloadName)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma
router.post('/', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  Recurso.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})



// Alterar uma
router.put('/', function(req, res){
  Recurso.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma
router.delete('/:id', function(req, res) {
  Recurso.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});



module.exports = router;