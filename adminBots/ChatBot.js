class ChatBot{
    constructor(data){ // id, name, brains (liste de cerveaux), discord (booléen indiquant l'accès à Discord)
        if(undefined != data.id) {
            this.id = data.id;
        } else {
            this.id = parseInt(    Math.floor(Math.random() * Math.floor(100000))     );
        }
        
        if(undefined != data.name) {
            this.nom = data.name;
        } else {
            this.title = "Bot";
        }

        if(undefined != data.brains) {
            this.brains = data.brains;
        } else {
            this.brains = [];
        }

        if(undefined != data.discord) {
            this.discord = data.discord;
        } else {
            this.discord = false;
        }
    }
}

module.exports = ChatBot;