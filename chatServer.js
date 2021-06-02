const express = require('express');
const bodyParser = require('body-parser');
var RiveScript = require("rivescript");
const Chatbot = require("./chatBots/Chatbot.js");

const appChat = express();

var chatBot = new RiveScript();
var selectedBot = new Chatbot({id:0, name:"Rémi"});
chatBot.loadFile(selectedBot.personality).then(loading_done).catch(loading_error);
console.log("Just created a bot " + selectedBot.name);
const port = selectedBot.id + 3000;
console.log(port + ' is the magic port');

var sentence;
var answer;


function loading_done() {
   console.log("Bot has finished loading!");
  
   chatBot.sortReplies();
  
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
    res.render('pages/privateTalk', {answer:answer, sentence:sentence, chatBot:selectedBot});
});


appChat.post('/talking', (req, res, next) => {
   try {
      console.log("Est-ce que tu me voies ?");
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

appChat.listen(port);


module.exports = appChat;
