var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')

const xml2js = require('xml2js');
var admZip = require('adm-zip')
const Libxml = require('node-libxml');
let libxml = new Libxml();

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (request, file, callback) {
        if (request.recurso) {
           // TODO: consider adding file type extension
           return callback(null, request.recurso.titulo.toString());
        }
        // fallback to the original name if you don't have a book attached to the request yet.
        return callback(null, file.originalname)
    }
});

var upload = multer({dest: './public/uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/zip") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .zip files are allowed!'));
    }
  }, storage: storage
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
  res.render('new-recurso')
})

 router.post('/inserir', upload.single('myFile'), function(req,res){
   var check = 0;
   if(req.file.path === undefined) { res.status(304).send('Please fill all of the form')}
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

             var rcs = {
                 title: req.body.title,
                 subtitle: req.body.subtitle,
                 desc : req.body.desc,
                 type: req.body.type,
                 year: req.body.year,
                 uc: req.body.uc,
                 visibility: req.body.visibility,
                 dateCreation: new Date().toISOString().slice(0,10)
             };
             console.log(req.body)
             console.log(req.body.title)

             var json_metadata = JSON.stringify(result.recurso)
             axios.post('http://localhost:8001/recursos?token=' + req.cookies.token, rcs)
               .then(res.redirect('/'))
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

router.get('/download/:filename', function(req, res) {
    res.download(__dirname + '/public/fileStore/' + req.params.filename)
})

//falta aqui uma página de "manage" tipo os dos users, que dê para alterar e apagar recursos.

//router.post

//router.put

module.exports = router;
