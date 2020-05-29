const Discord = require('discord.js');
const Rivescript = require('rivescript');
const cerveau = new Rivescript();
const client = new Discord.Client();

var reponse = false;
var Bot = require('./modeles/bot');

class interfaceDiscord{
    constructor(nomBot, cerveauBot){
        this.nomBot = nomBot;
        this.cerveauBot = cerveauBot;
        this.token = 'NzA5NDYzNzI1NTM0MzQ3MzM1.Xrmmhw.QNtxrKED9Zm5Ax0ytVdyPVty89U';
        this.nomCerveau = "cerveaux/"+cerveauBot+".rive";
    }

    init(){
        cerveau.loadFile(this.nomCerveau).then(loading_done).catch(loading_error);

        function loading_done(){
            console.log("Le cerveau est pret");
            cerveau.sortReplies();
        }
        
        function loading_error(error){
            console.log("Erreur :"+error);
        }

        client.once('ready', () => {
            console.log('Le bot est pret !');
        });
        
        client.on('message', message => {
            console.log(message.content);
            if (!reponse){
                cerveau.reply("user", message.content).then(function(reply){
                    message.channel.send(reply);
                    reponse = true;
                });
            }else{
                reponse = false;
            }
        });

        client.login(this.token);
    }

    majCerveau(nouveauCerveau){
        this.nomCerveau = "./cerveaux/"+nouveauCerveau+".rive";
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