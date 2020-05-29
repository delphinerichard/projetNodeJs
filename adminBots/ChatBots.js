const ChetBit = require("./ChatBot.js");
const data = require("./data.json");


class ChatBots{

    constructor(){
        this.chatbots = new Map();
        data.forEach((item, index, array) => {
            let newChatBot = new ChatBots(item);
            this.chatbots.set(newChatBot.id, newChatBot);
        });
    }

    get size(){
        return this.chatbots.size;
    }

    addChatBot(bot){
        let newChatBot = new ChatBots(bot);
        console.log("addChatBot :"+JSON.stringify(newChatBot));
        this.chatbots.set(newChatBot.id,newChatBot);
        return this.getChatBot(newChatBot.id);
    }

    getChatBot(id){
        this.chatbots.forEach(logMapElements);
        console.log(typeof id);
        console.log("getting ChatBot with id "+id+" : "+JSON.stringify(this.chatbots.get(id)));
        return this.chatbots.get(id);
    }

    
}