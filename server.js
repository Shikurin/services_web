var express = require('express');
var app = express();

var rout = require('./routeur').routeur;

//Configuration Body Parser

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/api/', rout);

app.listen(8080);
console.log('8080 is the magic port');
