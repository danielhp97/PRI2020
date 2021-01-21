var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var mongoose = require('mongoose');
const connectionstring = 'mongodb+srv://root:projetopri2020@cluster0.yy2rh.mongodb.net/pri2020?retryWrites=true&w=majority';
mongoose.connect(connectionstring,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        //serverSelectionTimeoutMS: 5000
      }
    );
//
//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://root:projetopri2020@cluster0.yy2rh.mongodb.net/tasks?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  client.close();
//});

//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
//db.once('open', function() {
//  console.log("Conexão ao MongoDB realizada com sucesso...")
//});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
