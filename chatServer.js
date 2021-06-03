const express = require('express');
const bodyParser = require('body-parser');
var RiveScript = require("rivescript");

const appChat = express();

var privateChatBot = new RiveScript();

var sentence;
var answer;


function loading_done() {
   console.log("Bot has finished loading!");
  
   privateChatBot.sortReplies();
  
   let username = "local-user";
}

function loading_error(error, filename, lineno) {
   console.log("Error when loading files: " + error);
}


// parse application/json
appChat.use(bodyParser.json());

appChat.use(bodyParser.urlencoded({extended:true}));


// set the view engine to ejs
appChat.set('view engine', 'ejs');


// privateTalk page
appChat.get('/', function(req, res) {
    res.render('pages/privateTalk', {answer:answer, sentence:sentence, privateChatBot:activatedBot});
});


appChat.post('/talking', (req, res, next) => {
   try {
      privateChatBot.loadFile(activatedBot.personality).then(loading_done).catch(loading_error).then(PCB => {;
         console.log(req.body.sentence);
         sentence = req.body.sentence;
         let username = "local-user";
         privateChatBot.reply(username, req.body.sentence).then(function(reply) {
            console.log("The bot says: " + reply);
            answer = reply;
            console.log(answer);
         });
      });
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});


module.exports = appChat;
