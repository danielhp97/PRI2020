var express = require('express');
var router = express.Router();

const Recurso = require('../controllers/recurso')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página dos Recursos' });
});

router.get('/recursos', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Recurso.listar()
    .then(dados => res.render('recursos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
    //res.render('index', { title: 'Turma PRI de 2020' });
});


router.get('/recursos/:id', (req,res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Recurso.consultar(req.params.id)
    .then(dados=> res.render('recurso', {aluno: dados}))
    .catch(e => res.render('error', {error: e}))
})


router.post('/recursos', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  var r = {
    //id: String, gerar id?
    tipo: req.body.Tipo,
    titulo: req.body.Titulo,
    dataRegisto: req.body.dataRegisto,
    visiblidade: req.body.visiblidade
    //storeLocation: String
  }
  Recurso.inserir(r)
      .then(dados => res.redirect('/recursos'))
      .catch(e => res.render('error', {error: e}))
})
module.exports = router;
