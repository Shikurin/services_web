const express = require('express');
const bodyParser = require('body-parser');
var RiveScript = require("rivescript");

var rout = require('./routeur').routeur;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://ruben:Galindo95190@cluster0.jnuvf.mongodb.net/ChatBotServiceWeb?retryWrites=true&w=majority';
const dbName = 'ChatBotServiceWeb';
global.db
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
  db = client.db(dbName);
});
global.IsLogin = 0
const ChatbotService = require("./chatBots/ChatbotService_ArrayImpl.js");

let chatBotServiceInstance;

const app = express();
const appChat = require('./chatServer.js');
const port = 8080;

var chatBot = new RiveScript();
var privateChatBot = new RiveScript();
var selectedBot;

var listPersonalities = new Array();
listPersonalities.push("brains/hello.rive");
listPersonalities.push("brains/standard.rive");

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

app.use('/api/', rout);

app.get('/', (req, res, next) => {
   //nothing to do
   next();
});

// personalities page
app.get('/personalities', function(req, res) {
    res.render('pages/personalities', {listPersonalities:listPersonalities});
});

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

app.post('/selectPersonality', (req, res, next) => {
   try {
      personality = String(req.body.selectPersonality);
      console.log("Nous avons trouvé une personnalité ! " + personality);
      if (selectedBot) {
         selectedBot.personality = personality;
         chatBot.loadFile(selectedBot.personality).then(loading_done).catch(loading_error);
      }
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
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

app.post('/activate', (req, res, next) => {
   try {
      activatedBot = chatBotServiceInstance.selectChatbot(parseInt(req.body.idActivate));
      console.log("Un bot vient juste d'être activé : " + activatedBot.name);
      activatedBot.state = true;
      let activatedPort = activatedBot.id + 3000;
      activatedBot.server = appChat.listen(activatedPort);
      console.log(activatedPort + " is another magic port!");
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});

app.post('/delete', (req, res, next) => {
   try {
      deletedBot = chatBotServiceInstance.selectChatbot(parseInt(req.body.id));
      if (deletedBot.state) {
         deletedBot.server.close();
         deletedBot.state = true;
         console.log("Le port du bot est désactivé !");
      }
      chatBotServiceInstance.removeChatbot(deletedBot.id);
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
});

app.post('/talking', (req, res, next) => {
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
   res.redirect("/talk");
});

app.post('/selectFile', (req, res, next) => {
   try {
      selectedFile = String(req.body.idSelectFile);
      if (listPersonalities.indexOf("brains/" + selectedFile) === -1) {
         console.log("J'ajoute une personnalité : " + "brains/"+selectedFile);
         listPersonalities.push("brains/" + selectedFile);
      } else {
         console.log("Cette personnalité existe déjà !");
      }
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/personalities");
});


app.use((req, res, next) => {
   res.render('pages/form', {list:chatBotServiceInstance.getChatbots(), chatBot:selectedBot, listPersonalities:listPersonalities});
   next();
});


ChatbotService.create().then(ts => {
   chatBotServiceInstance = ts;
   app.listen(port);
   console.log(port + ' is the magic port');
});
