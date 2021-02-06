var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')


/* middleware for protecting admin only routes */
//function(req, res, next) {
//  var dados = jwt_decode(req.cookies.token).level;
//  if (dados != 'admin') res.status(403).send('Access denied.')
//  next()
//},

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}


router.post('/registo', function(req, res){
  console.log('req.url ? ' + req.url + 'Info do pedido req.body: '+ JSON.stringify(req.body));
  var usr = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      filiation: req.body.filiation,
      level: req.body.level,
      dateRegister: new Date().toISOString().slice(0,10),
  }
                                           //ou do req body
  axios.post('http://localhost:8002/users', usr) //dá post no server da autenticacao porque na precisa de token
    .then(res.redirect('/'))
    .catch(e => res.render('Erro no Registo', {error: e}))
});



// lista de users (protegida, apenas para admins.)
router.get('/',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).level;
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
router.get('(\/[A-Z]+[0-9]+)', (req, res) => {
    var idUser = req.url.split("/")[1]
    console.log(idUser);
    axios.get('http://localhost:8001/users/' + idUser + '?token=' + req.cookies.token)
      .then(dados => res.render('userDetalhado', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
})



module.exports = router;