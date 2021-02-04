var express = require('express');
var router = express.Router();
var User = require('../controllers/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      console.log('Sessão destruida: ', err)

        res.status(200);
        //res.redirect('/');
    } else {
        console.log('Destroy session error: ', err)
    }
  });
});

router.get('/', function(req,res){
  User.listar()
    .then(dados => res.status(200).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/', function(req,res){
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/login', passport.authenticate('user'), function(req, res){
  jwt.sign({username: req.user.username,
            tipo: req.user.tipo,
            sub: 'Login Geral'}, "segredo",
            function(e,token) {
              if(e) res.status(500).jsonp({error: "Erro a gerar token: " + e})
              else res.status(201).jsonp({token: token})
            }
          )
        })


module.exports = router;