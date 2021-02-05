var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')
var multer = require('multer')
var upload = multer({dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/zip") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .zip files are allowed!'));
    }
  }
})

//get todos os recursos
router.get('/', function(req, res) {
  axios.get('http://localhost:8001/recursos?token=' + req.cookies.token)
    .then(dados => res.render('listaRecursos', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});

// pagina individual do recurso ( não tá funcional!)
// router.get('/:id', function(req,res) {
//   axios.get('http://localhost:8001/recursos/' + id + '?token=' + req.cookies.token)
//     .then(dados => res.render('resourcePage', {lista: dados.data}))
//     .catch(e => res.render('error', {error: e}))
// })

router.post('/', function(req,res){
  console.log('req.url ? ' + req.url + 'Info do pedido req.body: '+ JSON.stringify(req.body));

  var recurso = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    desc: req.body.desc,
    type: req.body.type,
    year: req.body.year,
    uc: req.body.uc,
    visibility: req.body.visibility,
    dateCreation: new Date().toISOString().slice(0,10),
    rank: "0",
  }
  axios.post('http://localhost:8001/recursos?token=' + req.cookies.token, recurso)
    .then( res.redirect('/'))
    .catch(e => res.render('error', {error: e}))
});

//upload de recursos
router.get('/upload', function(req,res) {
  res.render('form_upload')
})


//upload : será aqui ou api? - no lado da app, aqui é o post apenas do json value. A app faz um route para aqui.
 router.post('/inserir', upload.single('myFile'), function(req,res){
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body));
   var zip = new admZip(req.file.path);
   var total_entries=zip.getEntries();
   total_entries.forEach(item => {
     if(item.name=="metadata.xml"){
       var content=item.getData().toString('utf8');
     libxml.loadDtds(['../temp/dtd/rule.dtd']); //nã tá criada a pasta ainda
       libxml.loadXmlFromString(content);
       let xmlIsValid = libxml.validateAgainstDtds();
       if(item.name=="segundo.xml" && xmlIsValid != false) {
         console.log('XML is valid!: Zip ' + req.file.path + ' was correctly introduced.\n' + 'Validated with ' + item.name);
         res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
         reres.status(200).jsonp(req.file);
         res.end();
         } else{
           console.log('Error on manifebtcsto: Please correct the manifesto');
           res.status(401).jsonp(req.file);
           res.end();
         }
       }
     });
 });
//ver o rec. upload, se o sistema de validação continua no API (como está agora, lá comentado) ou passa para aqui

//falta aqui uma página de "manage" tipo os dos users, que dê para alterar e apagar recursos.

//router.post

//router.put

module.exports = router;