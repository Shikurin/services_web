const Chatbot = require("./Chatbot.js");

class ChatbotService{

	constructor(data){  
		this.idCpt = 0;
		this.array = new Array();
	}
	
	static async create() {
		const service = new ChatbotService() ;
		return service ;
	}

	addChatbot(name){
		const id = this.idCpt;
		let newBot;
		if (undefined !== (newBot = new Chatbot({id:id, name:name}))) {
			console.log("Just created a bot " + newBot.name);
			this.array.push(newBot);
			this.idCpt++;
		} else {
			throw Error("cannot create a Bot");
		}
	}
	
	removeChatbot(id) {
		
		var pos ;
		let taskFound = false ;
		let i = 0 ;
		while (!taskFound) {
			if (this.array[i].id === id) {
				pos = i ;
				taskFound = true ;
			}
			i++ ;
		}
		
		let removedTask = this.array.splice(pos, i) ;
		
	}

	getChatbots(){
		return this.array;
	}

}

module.exports = ChatbotService;
