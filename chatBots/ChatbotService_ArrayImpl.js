const Chatbot = require("./Chatbot.js");

class ChatbotService {

	constructor(data){  
		this.idCpt = 0;
		this.array = new Array();
	}
	
	static async create() {
		const service = new ChatbotService() ;
		return service ;
	}

	addChatbot(name) {
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
		let botFound = false ;
		let i = 0 ;
		while (!botFound) {
			if (this.array[i].id === id) {
				pos = i ;
				botFound = true ;
			}
			i++ ;
		}
		
		let removedBot = this.array.splice(pos, i) ;
		
		console.log("Just erased a bot") ;
	}
	
	selectChatbot(id) {
		var pos ;
		let selectedBot ;
		let botFound = false ;
		let i = 0 ;
		while (!botFound) {
			if (this.array[i].id === id) {
				pos = i ;
				selectedBot = this.array[i] ;
				botFound = true ;
			}
			i++ ;
		}
		
		console.log("Just selected a bot : " + selectedBot.name);
		
		return selectedBot ;
	}

	getChatbots(){
		return this.array;
	}

}

module.exports = ChatbotService;
