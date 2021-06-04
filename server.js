var express = require('express');
var app = express();

var rout = require('./routeur').routeur;

//Configuration Body Parser

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// Configuration et Connexion à la base de données

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ruben:Galindo95190@cluster0.jnuvf.mongodb.net/ChatBotServiceWeb?retryWrites=true&w=majority';
const dbName = 'ChatBotServiceWeb';
global.db
 
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});

global.IsLogin = 0

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/api/', rout);

app.listen(8080);
console.log('8080 is the magic port');
