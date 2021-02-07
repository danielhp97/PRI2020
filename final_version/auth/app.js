var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { v4: uuidv4 } = require('uuid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var mongoose = require('mongoose');
const connectionstring = 'mongodb+srv://root:projetopri2020@cluster0.yy2rh.mongodb.net/pri2020?retryWrites=true&w=majority';
mongoose.connect(connectionstring,
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        //serverSelectionTimeoutMS: 5000
      }
    );

var User = require('./controllers/user');
// Configuração da estratégia local
passport.use('user', new LocalStrategy(
  {usernameField: 'username'}, (username, password, done) => {
    User.consultar(username)
      .then(dados=> {
        const user = dados
        if(!user) { return done(null, false, {message: 'Utilizador inexistente!\n'})}
        if(password != user.password) { return done(null, false, {message: 'Credenciais inválidas!\n'})}
        return done(null, user)
      })
      .catch(e => donne(e))
    })
)

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
  done(null, user.username, user.tipo)
})

// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((name, done) => {
  console.log('Desserielização, username: ' + name)
  User.consultar(name)
    .then(dados => done(null, dados))
    .catch(e => done(e, false))
})

var usersRouter = require('./routes/user');

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()
  },
  store: new FileStore({retries: 2}),
  secret: 'O meu segredo',
  resave: false,
  saveUninitialized: false
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('O meu segredo'));

app.use(passport.initialize());
app.use(passport.session());


app.use('/users', usersRouter);

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
  res.status(err.status || 500).jsonp({error: err.message});
});

module.exports = app;