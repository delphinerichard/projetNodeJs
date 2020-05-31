const Rivescript = require('rivescript');
var cerveau = new Rivescript();

var Bot = require('../modeles/bot');

class interfaceChat{
    constructor(nomBot, cerveauBot){
        this.nomBot = nomBot;
        this.cerveauBot = cerveauBot;
        this.nomCerveau = "cerveaux/"+cerveauBot+".rive";
    }

    init(){
        this.chargerCerveau();
    }

    parler(message, callback){
        cerveau.reply("user", message).then(function(reply){
            callback(reply)
        });
    }

    majCerveau(nouveauCerveau){
        this.cerveauBot = nouveauCerveau;
        this.nomCerveau = "cerveaux/"+nouveauCerveau+".rive";
        cerveau = new Rivescript();
        this.chargerCerveau();

    }

    chargerCerveau(){
        cerveau.loadFile(this.nomCerveau).then(loading_done).catch(loading_error);
        function loading_done(){
            console.log("Le cerveau est pret");
            cerveau.sortReplies();
        }
        
        function loading_error(error){
            console.log("Erreur :"+error);
        }

    }

}

module.exports = interfaceChat;