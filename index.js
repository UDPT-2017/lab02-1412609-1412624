var express = require('express')
var bodyParser = require('body-parser');
var sessions = require('express-session');
var app = express();
var path = require('path');
var session;
var exphbs = require('express-handlebars');

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



app.use(express.static('public'));
app.use('/components',express.static('bower_components'));

app.listen(3000, function () {
  console.log('Example app hay lam!')
})

app.get('/', function(req,res){
  res.render('index');
});
app.get('/users/register', function(req,res){
  res.render('register');
});
app.get('/users/login', function(req,res){
  res.render('login');
});

