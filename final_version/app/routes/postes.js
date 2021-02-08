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



'http://localhost:8001/recursos?token='

router.get('/', function(req,res){
  axios.get('http://localhost:8001/postes?token=' + req.cookies.token)
    .then(dados => res.render('home', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

router.get('/:idRec', function(req,res){
  var idRec = req.params.idRec
  var idUser = jwt_decode(req.cookies.token).id
  axios.get('http://localhost:8001/postes/' + idRec + '?token=' + req.cookies.token)
    .then(dados => res.render('postesRecurso', {lista: dados.data, rec_id: idRec,user_id: idUser}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/criar/:idRec', function(req, res){
  var recurso = req.params.idRec
  console.log(recurso)
  var pst = {
      title: req.body.title,
      body: req.body.body,
      author: jwt_decode(req.cookies.token).id,
      resource_id: recurso,
      dateCreation: new Date().toISOString().slice(0,10)
  }
  axios.post('http://localhost:8001/postes/?token=' + req.cookies.token, pst)
    .then(res.redirect('/postes/'+recurso))
    .catch(e => res.render('error', {message: 'Erro ao fazer o comentario, contacte o suporte', error: e}))
});



//apagar user
router.get('/apagar/:idRec/:idUser/:idPoste', function(req, res) {
  var recurso = req.params.idRec
  var cookie_id = jwt_decode(req.cookies.token).id;
  var level = jwt_decode(req.cookies.token).level;
  if( level === 'admin' || cookie_id === req.params.idUser) {
    axios.delete('http://localhost:8001/postes/' + req.params.idPoste + '?token=' + req.cookies.token)
      .then(res.redirect('/postes/'+recurso))
      .catch(e => res.render('error', {error: e}))
  } else {
    res.send('Operation Denied, Priviledge Check')
  }
})

module.exports = router;