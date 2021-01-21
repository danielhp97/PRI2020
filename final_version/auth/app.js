var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { v4: uuidv4 } = require('uuid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var axios = require('axios')

// Configuração da estratégia local
passport.use(new LocalStrategy(
  {usernameField: 'id'}, (username, password, done) => {
    axios.get('http://localhost:7709/users/' + username)
      .then(dados => {
        const user = dados.data
        if(!user) { return done(null, false, {message: 'Utilizador inexistente!\n'})}
        if(password != user.password) { return done(null, false, {message: 'Credenciais inválidas!\n'})}
        return done(null, user)
      })
      .catch(erro => done(erro))
    })
)

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
  console.log('Serielização, id: ' + user.id)
  done(null, user.id)
})
  
// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((uid, done) => {
  console.log('Desserielização, id: ' + uid)
  axios.get('http://localhost:7709/users/' + uid)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})
  
var indexRouter = require('./routes/index');
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('O meu segredo'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  console.log('Signed Cookies: ', JSON.stringify(req.signedCookies))
  console.log('Session: ', JSON.stringify(req.session))
  next()
})

app.use('/', indexRouter);
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
