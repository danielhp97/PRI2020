var express = require('express');
var router = express.Router();
var axios = require('axios')
var jwt_decode = require('jwt-decode')
var path = require('path')
const xml2js = require('xml2js');
var admZip = require('adm-zip')
const Libxml = require('node-libxml');
let libxml = new Libxml();

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
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

router.get('/:id', function(req, res) {
  axios.get('http://localhost:8001/recursos/' + req.params.id + '?token=' + req.cookies.token)
    .then(dados => res.render('recurso', {recurso: dados.data}))
    .catch(e => res.render('error', {error: e}))
});


//upload de recursos


router.post('/inserir', upload.single('myFile'), function(req,res){
  var check = 0;
  if(req.file.path === undefined) { res.status(304).send('Please fill all of the form')}
  var zip = new admZip(req.file.path);
  var total_entries=zip.getEntries();
  total_entries.forEach(item => {
    if(item.name==='metadata.xml') {check = 1};
  });
  if(check===1){
    //total_entries.forEach(item => {
      // if(item.name==='metadata.xml'){
      //   var content = item.getData().toString('utf8');
      //   libxml.loadDtds(['./public/dtd/recurso.dtd']); //set list of dtd's to compare to
      //   libxml.loadXmlFromString(content); // load content from metadata.xml
      //   let xmlIsValid = libxml.validateAgainstDtds(); // variable to check comparison
      //   if(xmlIsValid != false) {
      //     xml2js.parseString(content, (err, result) => {
      //       if(err) {
      //         throw err;
      //       }
      //       const json = JSON.stringify(result);

            var rcs = {
                author: jwt_decode(req.cookies.token).id,
                title: req.body.title,
                subtitle: req.body.subtitle,
                desc : req.body.desc,
                type: req.body.type,
                year: req.body.year,
                uc: req.body.uc,
                visibility: req.body.visibility,
                dateCreation: new Date().toISOString().slice(0,10),
                downloadName: req.file.filename
            };

            //var json_metadata = JSON.stringify(result.recurso)
            axios.post('http://localhost:8001/recursos?token=' + req.cookies.token, rcs)
              .then(res.redirect('/home'))
              .catch(e => res.render('error', {error: e}))
         //});
          //console.log('XML is valid!: Zip ' + req.file.path + ' was correctly introduced.\n' + 'Validated with ' + item.name);
          //jsonp(req.file);
        //} else {
        //  console.log('Error on manifesto: Please correct the manifesto');
        //  res.status(401).jsonp(req.file);
        //  res.end();
        //}
      //}
   //});
 } else {
  console.log('No metadata: Please add/rename metadata.xml');
  res.status(401).send('No metadata: Please add/rename metadata.xml');
  res.end();
 }
});

router.get('/download/:filename', function(req, res) {
  axios.get('http://localhost:8001/recursos/download/' + req.params.filename + '?token=' + req.cookies.token)
   .then(res.download(path.join(__dirname, '..', 'public', 'uploads') + '/' + req.params.filename)) //res.download(__dirname + '/public/fileStore/' + req.body.downloadName)
   .catch(e => res.render('error', {error: e}))
})


module.exports = router;