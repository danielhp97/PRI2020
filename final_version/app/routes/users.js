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
    .catch(e => res.render('registo-error', {message: 'Erro no Registo, contacte o suporte', error: e}))
});



// lista de users (protegida, apenas para admins.)
router.get('/',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).level;
  if (dados != 'admin') res.status(403).send('Access denied.')
  next()
}, function(req, res) {
  console.log(Object.keys(req.query).length)
  if(Object.keys(req.query).length > 1) {
    axios.get('http://localhost:8001/users' + req.url +'&token=' + req.cookies.token)
      .then(dados => res.render('listaUsers', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
  }else{
    axios.get('http://localhost:8001/users?token=' + req.cookies.token)
      .then(dados => res.render('listaUsers', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
  }
});



router.get('/manage',
function(req, res, next) {
  var dados = jwt_decode(req.cookies.token).level;
  if (dados != 'admin') res.status(403).send('Access denied.')
  next()
}, function(req, res, next) {
  res.render('admin')
});
//além disso, faltam aqui as rotas de post/put para comunicar com a API de forma a alterar os dados dos users (abaixo)

// router.put('/manage'),

// router.post('/manage'),

//router.delete('/manage'),

// pagina individual do user ( não tá funcional!)
router.get('/detalhe', (req, res) => {
    var user_id = jwt_decode(req.cookies.token).id
    axios.get('http://localhost:8001/users/detalhe/' + user_id + '?token=' + req.cookies.token)
      .then(dados => res.render('userDetalhado', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
})


//apagar user
router.get('/apagar/:idUser', function(req, res) {
  var cookie_id = jwt_decode(req.cookies.token).id;
  var level = jwt_decode(req.cookies.token).level;
  if( level === 'admin' || cookie_id === req.params.idUser) {
    axios.delete('http://localhost:8001/users/' + req.params.idUser + '?token=' + req.cookies.token)
      .then(res.redirect('/users/'))
      .catch(e => res.render('error', {error: e}))
  } else {
    res.send('Access Denied')
  }
})


//alterar user (put request)
router.get('/modificar/:idUser',function(req, res, next) {
  var cookie_id = jwt_decode(req.cookies.token).id;
  var level = jwt_decode(req.cookies.token).level;
  console.log(req.params.idUser);
  console.log(req.query.name);
  console.log(req.query.email);
  var put_data = {
    _id: req.params.idUser,
    name: req.query.name,
    username: req.query.username,
    email: req.query.email,
    password: req.query.password,
    filiation: req.query.filiation,
    level: req.query.level
  }
  if( level === 'admin' || cookie_id === req.params.idUser) {
    axios.put('http://localhost:8001/users/?token=' + req.cookies.token, put_data)
      .then(res.redirect('/home'))
      .catch(e => res.render('error', {error: e}))
  }
})

module.exports = router;