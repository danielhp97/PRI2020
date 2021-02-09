var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')

router.get('/', function(req, res) {
  res.render('login-form');
});

router.get('/home', function(req, res) {
  axios.get('http://localhost:8001/postes/?token=' + req.cookies.token)
    .then(dados => res.render('home', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/repositorio', function(req, res) {
  console.log('req url'+req.url)
  axios.get('http://localhost:8001/recursos' + req.url + '&visibility0' +'&token=' + req.cookies.token)
  .then(dados => res.render('listaRecursos', {lista: dados.data}))
  .catch(e => res.render('error', {error: e}))
})

router.get('/recursosprivados',
 function(req, res) {
  var ulevel = jwt_decode(req.cookies.token).level;
  var uid = jwt_decode(req.cookies.token).id;

  if(ulevel == 'admin' || ulevel == 'produtor') {
    axios.get('http://localhost:8001/recursos/author/'+uid+'?token=' + req.cookies.token)
      .then(dados => res.render('recursos-privados', {lista: dados.data}))
      .catch(e => res.render('error', {error: e}))
  }
  else{
     res.render('privilege-error', {message: 'Não tem permissões para aceder a esta página'})
  }
})



router.get('/editar/recursos/:id', 
 function(req, res) {
  res.render('editarRecurso',{id_rec: req.params.id})
});

router.get('/editar/users/:id', function(req, res, next) {
 var dados = jwt_decode(req.cookies.token).level;
 var id_cookie = jwt_decode(req.cookies.token).id;
 if (dados == 'admin' || id_cookie == req.params.id) next()
  else{
    res.status(403).send('Access denied.')
  }
}, function(req, res) {
  res.render('editarUser',{id_user: req.params.id})
});


//get pag registo
router.get('/registo', function(req, res) {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  res.render('registo');
});

// router.get('/users/lista',function(req, res, next) {
//  var dados = jwt_decode(req.cookies.token).level;
//  if (dados != 'admin') res.status(403).send('Access denied.')
//  next()
// }, function(req, res) {
//   console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
//   axios.get('http://localhost:8001/users?token=' + req.cookies.token)
//     .then(dados => res.render('listaUsers', {lista: dados.data}))
//     .catch(e => res.render('error', {error: e}))
// });


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


router.get('/recursos/upload',function(req, res, next) {
 var dados = jwt_decode(req.cookies.token).level;
 if (dados === 'consumidor') res.status(403).send('Access denied.')
 next()
}, function(req,res) {
  res.render('new-recurso')
});

module.exports = router;
