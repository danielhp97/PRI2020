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

  if (req.query.type && req.query.uc && req.query.year) {
    Recurso.listarTypeUcYear(req.query.type, req.query.uc, req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.type && req.query.uc) {
    Recurso.listarTypeUc(req.query.type, req.query.uc)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.type && req.query.year) {
    Recurso.listarTypeYear(req.query.type, req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.uc && req.query.year) {
    Recurso.listarUcYear(req.query.uc,req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.uc) {
    Recurso.listarUcYear(req.query.uc)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.year) {
    Recurso.listarUcYear(req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.type) {
    Recurso.listarUcYear(req.query.type)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else {
    Recurso.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({error: e}))
  }
})



// Consultar uma
router.get('/:id', function(req, res) {
  Recurso.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/author/:author', function(req, res) {
  console.log('req params autor'+req.params.author)

  Recurso.consultarAuthor(req.params.author)
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