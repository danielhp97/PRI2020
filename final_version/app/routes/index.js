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
  console.log(' req url ' + req.url +' Info do pedido req.body: '+ JSON.stringify(req.body));
  axios.get('http://localhost:8001/recursos?visibility=publico&token=' + req.cookies.token)
    .then(dados => res.render('listaRecursos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})



router.get('/recursosprivados', function(req, res) {
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

router.get('/index', function(req, res) {
  res.render('index');
});

router.get('/editar/recursos/:id', function(req, res) {
  res.render('editarRecurso',{id_rec: req.params.id})
});

router.get('/editar/users/:id', function(req, res) {
  res.render('editarUser',{id_user: req.params.id})
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
      res.redirect('/timeupdate')
    })
    .catch(e => res.render('login-error', {message: 'Credenciais Inválidas', error: e}))
});

router.get('/timeupdate', function(req,res){
  var userID = jwt_decode(req.cookies.token).id;
  var dateLastAcess = new Date(Date.now())
  axios.put('http://localhost:8001/users/lastacess/'+userID+'?token=' + req.cookies.token, dateLastAcess)
    .then(res.redirect('/home'))
    .catch(e => res.render('error', {error: e}))
})


router.get('/recursos/upload', function(req,res) {
  res.render('new-recurso')
});

module.exports = router;
