var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')

const xml2js = require('xml2js');
var admZip = require('adm-zip')
const Libxml = require('node-libxml');
let libxml = new Libxml();

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

//upload de recursos
router.get('/upload', function(req,res) {
  res.render('form_upload')
})

 router.post('/inserir', upload.single('myFile'), function(req,res){
   var check = 0;
   var zip = new admZip(req.file.path);
   var total_entries=zip.getEntries();
   total_entries.forEach(item => {
     if(item.name==='metadata.xml') {check = 1};
   });
   if(check===1){
     total_entries.forEach(item => {
       if(item.name==='metadata.xml'){
         var content = item.getData().toString('utf8');
         libxml.loadDtds(['./public/dtd/recurso.dtd']); //set list of dtd's to compare to
         libxml.loadXmlFromString(content); // load content from metadata.xml
         let xmlIsValid = libxml.validateAgainstDtds(); // variable to check comparison
         if(xmlIsValid != false) {
           xml2js.parseString(content, (err, result) => {
             if(err) {
               throw err;
             }
             const json = JSON.stringify(result);
             //res.status(200).send(JSON.stringify(result, null, 4));
             //res.end();
             //console.log(json.recurso);
             var json_post = {
               title: JSON.stringify(result.recurso.title),
               subtitle: JSON.stringify(result.recurso.subtitle),
               desc: JSON.stringify(result.recurso.desc),
               type: JSON.stringify(result.recurso.type),
               year: JSON.stringify(result.recurso.year),
               uc: JSON.stringify(result.recurso.uc),
               visibility: JSON.stringify(result.recurso.visibility),
               dateCreation: JSON.stringify(result.recurso.dateCreation),
               rank: JSON.stringify(result.recurso.rank)
             }
             console.log(json_post.title);
             axios.post('http://localhost:8001/recursos?token=' + req.cookies.token)
               .then(json)
               .catch(e => res.render('error', {error: e}))
          });
           //console.log('XML is valid!: Zip ' + req.file.path + ' was correctly introduced.\n' + 'Validated with ' + item.name);
           //jsonp(req.file);
         } else {
           console.log('Error on manifesto: Please correct the manifesto');
           res.status(401).jsonp(req.file);
           res.end();
         }
       }
    });
  } else {
   console.log('No metadata: Please add/rename metadata.xml');
   res.status(401).send('No metadata: Please add/rename metadata.xml');
   res.end();
  }
});
//ver o rec. upload, se o sistema de validação continua no API (como está agora, lá comentado) ou passa para aqui

//falta aqui uma página de "manage" tipo os dos users, que dê para alterar e apagar recursos.

//router.post

//router.put

module.exports = router;
