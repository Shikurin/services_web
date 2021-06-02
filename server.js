const express = require('express');
const bodyParser = require('body-parser');
var RiveScript = require("rivescript");

const ChatbotService = require("./chatBots/ChatbotService_ArrayImpl.js");

let chatBotServiceInstance;

const app = express();
const port = 3001;

var chatBot = new RiveScript();
var selectedBot;

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
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
   //nothing to do
   next();
});

/*
// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});
*/

// talk page
app.get('/talk', function(req, res) {
    res.render('pages/talk', {answer:answer, sentence:sentence, list:chatBotServiceInstance.getChatbots(), chatBot:selectedBot});
});


app.post('/', (req, res, next) => {
   try {
      console.log("Call to addBot with " + req.body.name);
      chatBotServiceInstance.addChatbot(req.body.name);
   } catch(e) {
      console.log("An error occured : " + e);
   }
   next();
});

app.post('/select', (req, res, next) => {
   try {
      selectedBot = chatBotServiceInstance.selectChatbot(parseInt(req.body.idSelect));
      console.log(selectedBot);
      chatBot.loadFile(selectedBot.personality).then(loading_done).catch(loading_error);
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});

app.post('/delete', (req, res, next) => {
   try {
      chatBotServiceInstance.removeChatbot(parseInt(req.body.id));
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});

app.post('/talking', (req, res, next) => {
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
   res.redirect("/talk");
});


app.use((req, res, next) => {
   res.render('pages/form', {list:chatBotServiceInstance.getChatbots()});
   next();
});


ChatbotService.create().then(ts => {
   chatBotServiceInstance = ts;
   app.listen(8080);
   console.log('8080 is the magic port');
});
