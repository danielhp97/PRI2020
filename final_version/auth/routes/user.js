var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');


router.get('/', function(req,res){
  User.listar()
    .then(dados => res.status(200).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/', function(req,res){
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/login', passport.authenticate('user'), function(req, res){
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
  jwt.sign({
            username: req.user.username,
            level: req.user.level,
            id: req.user._id,
            sub: 'Login Geral'}, "segredo",
            function(e,token) {
              if(e) res.status(500).jsonp({error: "Erro a gerar token: " + e})
              else res.status(201).jsonp({token: token})
            }
          )
        })


module.exports = router;