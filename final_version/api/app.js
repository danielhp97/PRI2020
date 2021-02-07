var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var recursoRouter = require('./routes/recursos');
var usersRouter = require('./routes/users');
var postesRouter = require('./routes/postes');

var mongoose = require('mongoose');
const connectionstring = 'mongodb+srv://root:projetopri2020@cluster0.yy2rh.mongodb.net/pri2020?retryWrites=true&w=majority';
mongoose.connect(connectionstring,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        //serverSelectionTimeoutMS: 5000
      }
    );

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function(req,res,next){

  var token = req.query.token || req.body.token;
  jwt.verify(token, "segredo", function(e, payload){
    if(e) res.status(401).jsonp({error: "Erro na verificacao do token" + e})
    else{
      req.user = {username:payload.username, level:payload.level}
      next()
    }
  })
})


app.use('/', indexRouter);
app.use('/recursos', recursoRouter);
app.use('/users', usersRouter);
app.use('/post', postesRouter)

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
