var express = require('express');
var router = express.Router();
var axios = require('axios')

/* middleware for protecting admin only routes */
//function(req, res, next) {
//  var dados = jwt_decode(req.cookies.token).tipo;
//  if (dados != 'admin') res.status(403).send('Access denied.')
//  next()
//},

// lista de users (protegida, apenas para admins.)
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
//além disso, faltam aqui as rotas de post/put para comunicar com a API de forma a alterar os dados dos users (abaixo)

// router.put('/manage'),

// router.post('/manage'),

//router.delete('/manage'),

// pagina individual do user ( não tá funcional!)
router.get('(\/[A-Z]+[1-9]+)', (req, res) => {
    var idUser = req.url.split("/")[1]
    axios.get('http://localhost:8001/users/' + idUser + '?token=' + req.cookies.token)
      .then(dados => res.render('userDetalhado', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
})



module.exports = router;