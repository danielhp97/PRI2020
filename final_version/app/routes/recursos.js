var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/', function(req, res) {
  axios.get('http://localhost:8001/?token=' + req.cookies.token)
    .then(dados => res.render('listaRecursos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

// pagina individual do recurso ( não tá funcional!)
router.get('/:id', function(req,res) {
  axios.get('http://localhost:8001/recursos/' + id + '?token=' + req.cookies.token)
    .then(dados => res.render('resourcePage', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

//upload de recursos
router.get('/upload', function(req,res) {
  axios.get('http://localhost:8001/recursos/upload?token=' + req.cookies.token)
    .then(dados => res.render('form_upload', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})
//ver o rec. upload, se o sistema de validação continua no API (como está agora, lá comentado) ou passa para aqui

//falta aqui uma página de "manage" tipo os dos users, que dê para alterar e apagar recursos.

//router.post

//router.put

module.exports = router;
