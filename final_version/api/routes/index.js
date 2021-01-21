// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recursos')

// Listar todas as tarefas
router.get('/', (req, res) => {
  Recurso.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

// Consultar uma tarefa
router.get('/recursos/:id', function(req, res) {
  Recurso.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Inserir uma tarefa
router.post('/recursos', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  var r = {
    //id: String, gerar id?
    tipo: req.body.Tipo,
    titulo: req.body.Titulo,
    //dataRegisto: req.body.DataRegisto,
    visiblidade: req.body.Visiblidade
    //storeLocation: String
  }
  Recurso.inserir(r)
      .then(dados => res.redirect('/inserir')) //gerar janela de resposta RECURSO INSERIDO
      .catch(e => res.render('error', {error: e}))
})

// Alterar uma tarefa
router.put('/recursos', function(req, res){
  Recurso.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

// Remover uma tarefa
router.delete('/recursos/:id', function(req, res) {
  Recurso.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
