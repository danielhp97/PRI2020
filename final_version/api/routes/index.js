// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recursos')
const User = require('../controllers/users');
//var admZip = require('adm-zip')
//const Libxml = require('node-libxml');
//let libxml = new Libxml();

// Não necessário.
//router.get('/', (req, res) => {
//  Recurso.listar()
//    .then(dados => res.status(200).jsonp(dados) )
//    .catch(e => res.status(500).jsonp({error: e}))
//});
router.put('user/lastacess/:user', function(req, res){
  var url = req.url.split("/")[2]
  var userID = url.split("?")[0]
  console.log(url)
  console.log(userID)
  console.log(user)
  // User.alterarLastAcess(userID)
  //   .then(dados => res.status(201).jsonp({dados: dados}))
  //   .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;