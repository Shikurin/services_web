class Chatbot {

  constructor(data) {  // id, name, personality, state, server
  
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
    
    if(undefined != data.state) {
      this.state = data.state;
    } else {
      this.state = false;
    }
    
    if(undefined != data.server) {
      this.server = data.server;
    } else {
      this.server = false;
    }
    
  }
  
}


module.exports = Chatbot;
