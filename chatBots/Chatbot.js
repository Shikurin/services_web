class Chatbot {

  constructor(data) {  // id, name, personality
  
    if (undefined != data.id) {
      this.id = data.id;
    } else {
      this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
    }
    
    if(undefined != data.name) {
      this.name = data.name;
    } else {
      this.name = "HelloBot";
    }
    
    if(undefined != data.personality) {
      this.personality = data.personality;
    } else {
      this.personality = "brains/hello.rive";
    }
    
  }
  
}


module.exports = Chatbot;
