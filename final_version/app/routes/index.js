var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req, res) {
  res.render('login-form');
});

//get pag registo
router.get('/registo', function(req, res) {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  res.render('registo');
});

router.get('/listausers', function(req, res) {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  axios.get('http://localhost:8001/users?token=' + req.cookies.token)
    .then(dados => res.render('listaUsers', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

/*
router.get('/logout', function(req,res){

})
*/

router.post('/login', function(req, res) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados => {
      res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/')
    })
    .catch(e => res.render('error', {error: e}))
});

/*
router.get('/recursos',
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
*/


module.exports = router;
