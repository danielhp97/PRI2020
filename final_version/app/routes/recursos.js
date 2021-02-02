var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).tipo;
  if (dados != 'admin') res.status(403).send('Access denied.')
  next()
},
  function(req, res) {
  axios.get('http://localhost:8001/?token=' + req.cookies.token)
    .then(dados => res.render('listaRecursos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


//upload de recursos
router.get('/upload', function(req,res) {
  axios.get('http://localhost:8001/recursos/upload?token=' + req.cookies.token)
    .then(dados => res.render('form_upload', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
