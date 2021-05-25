const Chatbot = require("./Chatbot.js");

class ChatbotService{
	constructor(data){  
		this.array = new Array();
	}

	addChatbot(data){
		this.array.push(new Chatbot({name:data.name}));
	}

	getChatbots(){
		return this.array;
	}

}

module.exports = ChatbotService;
