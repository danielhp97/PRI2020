var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')

router.get('/', function(req, res) {
  res.render('login-form');
});

router.get('/home', function(req, res) {
  res.render('home');
});

//lista com rotas/views
router.get('/index', function(req, res) {
  res.render('index');
});

router.get('/repositorio', function(req, res) {
  axios.get('http://localhost:8001/recursos?token=' + req.cookies.token)
  .then(dados => res.render('listaRecursos', {lista: dados.data}))
  .catch(e => res.render('error', {error: e}))
})

router.get('/meusrecursos', function(req, res) {
  axios.get('http://localhost:8001/recursos?token=' + req.cookies.token)
  .then(dados => res.render('listaRecursos', {lista: dados.data}))
  .catch(e => res.render('error', {error: e}))
})

router.get('/index', function(req, res) {
  res.render('index');
});


//get pag registo
router.get('/registo', function(req, res) {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  res.render('registo');
});

router.get('/users/lista', function(req, res) {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  axios.get('http://localhost:8001/users?token=' + req.cookies.token)
    .then(dados => res.render('listaUsers', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


router.post('/login', function(req, res) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/home')
    })
    .catch(e => res.render('login-error', {message: 'Credenciais Inválidas', error: e}))
});

router.get('/logout', function(req, res) {
  axios.get('http://localhost:8002/users/logout')
    .then(res.redirect('/'))
    .catch(e => res.send(e))
});


router.get('/recursos/upload', function(req,res) {
  res.render('new-recurso')
});

module.exports = router;
