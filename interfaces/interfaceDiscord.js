const Discord = require('discord.js');
const Rivescript = require('rivescript');
var cerveau = new Rivescript();

var reponse = false;
var Bot = require('../modeles/bot');

class interfaceDiscord{
    constructor(nomBot, cerveauBot){
        this.client = new Discord.Client();
        this.nomBot = nomBot;
        this.cerveauBot = cerveauBot;
        this.token = 'NzA5NDYzNzI1NTM0MzQ3MzM1.Xrmmhw.QNtxrKED9Zm5Ax0ytVdyPVty89U';
        this.nomCerveau = "cerveaux/"+cerveauBot+".rive";
    }

    init(){
        this.chargerCerveau();

        this.client.once('ready', () => {
            console.log('Le bot '+this.nomBot+' est pret !');
        });
        
        this.client.on('message', message => {
            if (!reponse){
                cerveau.reply("user", message.content).then(function(reply){
                    message.channel.send(reply);
                    reponse = true;
                });
            }else{
                reponse = false;
            }
        });

        this.client.login(this.token);
    }

    parler(message, callback){
        callback("Je ne suis pas connecté sur la bonne interface")
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

module.exports = interfaceDiscord;