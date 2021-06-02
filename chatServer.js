const express = require('express');
const bodyParser = require('body-parser');
var RiveScript = require("rivescript");

const appChat = express();

var chatBot = new RiveScript();

var sentence;
var answer;


// parse application/json
appChat.use(bodyParser.json());

appChat.use(bodyParser.urlencoded({extended:true}));


// set the view engine to ejs
appChat.set('view engine', 'ejs');


// privateTalk page
appChat.get('/', function(req, res) {
    res.render('pages/privateTalk', {answer:answer, sentence:sentence, chatBot:activatedBot});
});


appChat.post('/talking', (req, res, next) => {
   try {
      console.log(req.body.sentence);
      sentence = req.body.sentence;
      let username = "local-user";
      chatBot.reply(username, req.body.sentence).then(function(reply) {
         console.log("The bot says: " + reply);
         answer = reply;
         console.log(answer);
      });
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});


module.exports = appChat;
