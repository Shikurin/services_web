class Chatbot {

  constructor(data){  // id, name, personality, state
    if (undefined != data.id) {
      this.id = data.id;
    } else {
      this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
    }
    if(undefined != data.name) {
      this.name = data.name;
    } else {
      this.name = "";
    }
    if(undefined != data.personality) {
      this.personality = data.personality;
    } else {
      this.personality = "";
    }
    if(undefined != data.state) {
      this.state = data.state;
    } else {
      this.state = [];
    }
  }
  
}

module.exports = Chatbot;
