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
  for (const key in req.query) {
    console.log(key, req.query[key])
  }

  if (req.query.type && req.query.uc && req.query.year &&  req.query.visibility) {
    Recurso.listarTypeUcYearVisibility(req.query.type, req.query.uc, req.query.year, req.query.visibility)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.type && req.query.uc & req.query.visibility) {
    Recurso.listarTypeUcVisibility(req.query.type, req.query.uc, req.query.visibility)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.type && req.query.year & req.query.visibility) {
    Recurso.listarTypeYearVisibility(req.query.type, req.query.year, req.query.visibility)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.year && req.query.uc & req.query.visibility) {
    Recurso.listarYearUcVisibility(req.query.year, req.query.uc, req.query.visibility)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.type && req.query.uc & req.query.year) {
    Recurso.listarTypeUcYear(req.query.type, req.query.uc, req.query.year)
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

  else if (req.query.visibility && req.query.year) {
    Recurso.listarVisibilityYear(req.query.visibility, req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.visibility && req.query.uc) {
    Recurso.listarVisibilityUc(req.query.visibility,req.query.uc)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.type && req.query.uc) {
    Recurso.listarTypeUc(req.query.type,req.query.uc)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.visibility && req.query.type) {
    Recurso.listarVisibilityType(req.query.visibility,req.query.type)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.uc) {
    Recurso.listarUc(req.query.uc)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.year) {
    Recurso.listarYear(req.query.year)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.type) {
    Recurso.listarType(req.query.type)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }

  else if (req.query.visibility) {
    Recurso.listarVisibility(req.query.visibility)
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
  }
  else {
    Recurso.listar()
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error))
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