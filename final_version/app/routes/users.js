var express = require('express');
var router = express.Router();
var axios = require('axios')

/* middleware for protecting admin only routes */


/* GET users listing. */
router.get('/', function(req, res) {
  console.log(JSON.stringify(req.cookies));
  axios.get('http://localhost:8001/users?token=' + req.cookies.token)
    .then(dados => res.render('listaUsers', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});




module.exports = router;