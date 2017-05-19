var express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var path = require('path');
var exphbs = require('express-handlebars');
var routes = require('./config/index');
var users = require('./config/user');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');



// View Engine
app.set('views', path.join(__dirname, 'app/views'));
app.engine('hbs', exphbs({
    layoutsDir: 'app/views/layouts',
    partialsDir: 'app/views/partials',
    defaultLayout: 'layout.hbs',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
 // res.locals.user = req.user || null;
  next();
});
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(express.static('public'));
app.use('/components',express.static('bower_components'));
// Set Port

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
})
app.use('/', routes);
app.use('/users',users);
// app.get('/', function(req,res){
//   res.render('index');
// });
// app.get('/users/register', function(req,res){
//   res.render('register');
// });
// app.get('/users/login', function(req,res){
//   res.render('login');
// });

