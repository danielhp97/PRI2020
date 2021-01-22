// Roteador do servidor API para o problema da gestão de tarefas
var express = require('express');
var router = express.Router();
const Recurso = require('../controllers/recursos')
const User = require('../controllers/users_lista');
//var admZip = require('adm-zip')
//const Libxml = require('node-libxml');
//let libxml = new Libxml();

// ------------------------------------------------ recurso
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
  //console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  //var r = {
    //id: String, gerar id?
  //  tipo: req.body.Tipo,
  //  titulo: req.body.Titulo,
    //dataRegisto: req.body.DataRegisto,
  //  visiblidade: req.body.Visiblidade
    //storeLocation: String
  //}
  Recurso.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
      //.then(dados => res.redirect('/inserir')) //gerar janela de resposta RECURSO INSERIDO
      //.catch(e => res.render('error', {error: e}))
})

//upload : será aqui ou app? - no lado da app, aqui é o post apenas do json value. A app faz um route para aqui.
// router.post('/inserir', upload.single('myFile'), function(req,res){
//   var zip = new admZip(req.file.path);
//   var total_entries=zip.getEntries();
//   total_entries.forEach(item => {
//     if(item.name=="metadata.xml"){
//       var content=item.getData().toString('utf8');
//       libxml.loadDtds(['../temp/dtd/rule.dtd']); //nã tá criada a pasta ainda
//       libxml.loadXmlFromString(content);
//       let xmlIsValid = libxml.validateAgainstDtds();
//       if(item.name=="segundo.xml" && xmlIsValid != false) {
//         console.log('XML is valid!: Zip ' + req.file.path + ' was correctly introduced.\n' + 'Validated with ' + item.name);
//         res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
//         reres.status(200).jsonp(req.file);
//         res.end();
//         } else{
//           console.log('Error on manifesto: Please correct the manifesto');
//           res.status(401).jsonp(req.file);
//           res.end();
//         }
//       }
//     });
// });

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


// ------------------------------------------------ user
router.get('/user', (req, res) => {
  User.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/user/:id', function(req, res) {
  User.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.put('/user', function(req, res){
  User.alterar(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});

// Remover uma tarefa
router.delete('/user/:id', function(req, res) {
  User.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/user', (req, res) => {
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({dados:dados}))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
