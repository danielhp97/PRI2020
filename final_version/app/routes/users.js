var express = require('express');
var router = express.Router();
var axios = require('axios')

/* middleware for protecting admin only routes */
//function(req, res, next) {
//  var dados = jwt_decode(req.cookies.token).tipo;
//  if (dados != 'admin') res.status(403).send('Access denied.')
//  next()
//},

// lista de users
router.get('/',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).tipo;
  if (dados != 'admin') res.status(403).send('Access denied.')
  next()
}, function(req, res) {
  console.log(JSON.stringify(req.cookies));
  axios.get('http://localhost:8001/users?token=' + req.cookies.token)
    .then(dados => res.render('listaUsers', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

// criar/apagar users - não acabada, precisa de dar render como está a ser feita no upload de ficheiros
router.get('/manage',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).tipo;
  if (dados != 'admin') res.status(403).send('Access denied.')
  next()
}, function(req, res) {
  console.log(JSON.stringify(req.cookies));
  axios.get('http://localhost:8001/users?token=' + req.cookies.token)
    .then(dados => res.render('listaUsers', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});
//além disso, faltam aqui as rotas de post/put para comunicar com a API de forma a alterar os dados dos users

// pagina individual do user ( não tá funcional!)
router.get('/:id', function(req,res) {
  axios.get('http://localhost:8001/users/' + id + '?token=' + req.cookies.token)
    .then(dados => res.render('form_upload', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;