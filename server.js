var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const utilisateur = require('./utilisateur.json');

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.post('/login', function(req, res) {
  var mail = req.body.user_mail; 
  var mdp = req.body.user_mdp;
  const user = utilisateur.find(utilisateur => utilisateur.mail === mail && utilisateur.mdp === mdp)
  if (typeof user != 'null'){
	
	}
});

app.listen(8080);
console.log('8080 is the magic port');
