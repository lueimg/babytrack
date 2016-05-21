var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    connection = require('./server/core/database.js'),
    path    = require("path"),
    multipart  = require('connect-multiparty'),
    fs = require('fs'),
    mime = require('mime');


// Set global function to avoid using console.log
global.printLog = function (msg) {
  console.log(msg);
};

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'DocumentarioISacmac'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(multipart({
    uploadDir: 'uploads'
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});


function validSession(req, res, next) {
  if (!req.user) res.redirect('/login.html');
  next();
}

passport.use(new LocalStrategy(
  {
    usernameField: 'userName',
    passwordField: 'password'
  },
  function (username, password, done) {
    // check if it is ok or not
    // aqui se puede hacer la busqueda del usuario
    var query = 'select * from usuarios where nombre = ' + "'" + username + "'" ;
    var user = {};

    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
        done(null, false, {code: 505, message: 'Internal Server Error.', dev: err})
        //throw err;
      } else {
        user = rows[0];
        if (user.clave === password) {
          done(null, user);
        } else {
          done(null, false, {message: 'bad passoword'});

        }
      }
    });
  }
));

// Para registrar
app.post('/signUp', function (req, res) {
  //res.send('hoa 2');
  console.log(req.body);
  // Aqui puedo registrar el usuario en mysql y devolver el objeto
  // del user en req.login
  req.login(req.body, function () {
    res.redirect('/');
  });
});

// para logear
app.post('/signIn', passport.authenticate('local', {
  failureRedirect: '/login.html'
}), function (req, res) {
  res.redirect('/');
});

// Maneja todo el angular
app.get('/', function (req, res, next) {
  try {
    if (!req.user) return res.redirect('/login.html');
    res.sendFile(path.join(__dirname+'/public/_index.html'));
  } catch (err){
    console.log(err);
    res.status(500).send({code: 500, msg: 'Internal Server Error', dev: err});
  }
});
// elimina la session
app.get('/logout', function (req, res){
  req.logOut();  // <-- not req.logout();
  res.redirect('/')
});

// Rutas de api
var login = require('./server/features/login.js')(app, connection),
    registros = require('./server/features/registros.js');

// Agrega prefijo a todas las rutas dentro de clientRoutes
app.use('/records', registros);

app.listen(1234, function () {
  console.log('Public server  running at port 1234');
  console.log('http://localhost:1234');
});