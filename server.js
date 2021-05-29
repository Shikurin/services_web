const express = require('express');
const bodyParser = require('body-parser');

const ChatbotService = require("./chatBots/ChatbotService_ArrayImpl.js");

let chatBotServiceInstance;

const app = express();
const port = 3001;


// parse application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true}));


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

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});
*/


app.post('/', (req, res, next) => {
   try {
      console.log("Call to addBot with " + req.body.name);
      chatBotServiceInstance.addChatbot(req.body.name);
   } catch(e) {
      console.log("An error occured : " + e);
   }
   next();
});

app.post('/delete', (req, res, next) => {
   try {
      chatBotServiceInstance.removeChatbot(parseInt(req.body.id));
   } catch(e) {
      console.log("An error occured : " + e);
   }
   res.redirect("/");
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
