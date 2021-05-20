var RiveScript = require("rivescript");

var helloBot = new RiveScript();

helloBot.loadFile("hello.rive").then(loading_done).catch(loading_error);

function loading_done() {
  console.log("Bot has finished loading!");
  
  helloBot.sortReplies();
  
  let username = "local-user";
  
  helloBot.reply(username, "Hello, bot!").then(function(reply) {
    console.log("The bot says: " + reply);
  });
}

function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}
