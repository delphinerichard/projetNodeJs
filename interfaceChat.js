var app = require('express')(),
    server = require('http').createServer(app)

const Rivescript = require('rivescript');
var cerveau = new Rivescript();
var io = require('socket.io').listen(server);
var ent = require('ent');

var Bot = require('./modeles/bot');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/chat.html');
  });



class interfaceChat{
    constructor(nomBot, cerveauBot){
        this.nomBot = nomBot;
        this.cerveauBot = cerveauBot;
        this.nomCerveau = "cerveaux/"+cerveauBot+".rive";
    }

    init(){
        this.chargerCerveau();
        io.sockets.on('connection', function (socket, pseudo) {

            socket.on('message', function (message) {
                message = ent.encode(message);
                cerveau.reply("user", message).then(function(reply){
                    socket.emit('message', {pseudo: "bot", message: reply});
                });
            }); 
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

server.listen(8080);
module.exports = interfaceChat;