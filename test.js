const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
var server = require('http').createServer(app)

const Rivescript = require('rivescript');
var cerveau = new Rivescript();
var io = require('socket.io').listen(server);
var ent = require('ent');
//var server = require('http').createServer(app)

const interfaceDiscord = require('./interfaces/interfaceDiscord');
//const interfaceChat = require('./interfaces/interfaceChat');

const tableauInterfaces = [];

app.use(express.json())
app.use(express.urlencoded({extended:false}))
//app.use(cors)




//Connexion à la base de données
mongoose.connect('mongodb://localhost/chatbots', {useNewUrlParser:true, useUnifiedTopology:true});
let bdd = mongoose.connection;
mongoose.set('useFindAndModify', false);


// Recupère le modèle d'un bot dans la base
var Bot = require('./modeles/bot');

bdd.once('open', function(){
    console.log("La base de données est connectée");
    Bot.updateMany({},{"actif":false}).exec();
})



const PORT = 5000;

/*
POST	/admin			    Créé un nouveau ChatBot
PUT		/admin/botID		Permet de modifier les informations du bot
DELETE	/admin/botID		Permet de supprimer l'accès à Discord du ChatBot botID
GET		/admin			    Donne l'état des ChatBots créés

JSON avec les infos du bot : id, nom, cerveau attribué, autorisation à garder les infos des utilisateurs, interface (Discord, Slack, etc)
*/

app.get('/affichage', function(req, res) {
    res.render('test2.ejs');
});

app.get('/admin', function(req,res){
    // Interroge la base pour retrouver tous les bots
    Bot.find({},function(err,bots){
        if(err) {
            res.status(400).json({msg: "Impossible d'afficher les bots"});
        }else {
            res.json({bots});
        }
    });
    //res.redirect('/affichage');
})

app.post('/admin',function(req,res){
    var nouveauBot = new Bot(req.body);
    console.log(nouveauBot);
    nouveauBot.save().then(function(bot){
        res.json(bot)
    }).catch(function(err){
        res.status(400).json({msg: "Impossible d'ajouter le bot dans la bdd"});
    })
    //res.redirect('/affichage');
})

//METHODE A SUPPR SI JAMAIS
app.post('/parler/a/:botID', function(req,res){
    let message = req.body.message;
    console.log(tableauInterfaces)
    for (let i =0; i<tableauInterfaces.length; i++){
        if (tableauInterfaces[i][0]._id.equals(req.params.botID)){
            try {
                tableauInterfaces[i][1].parler(message, (reponse => res.json({reponse: reponse})));
            } catch (error) {
                res.json({msg: "Erreur"})
            }
            //res.json({reponse: reponse});
        }
    }
})

app.put('/admin/:botID',function(req,res){
    Bot.findByIdAndUpdate(req.params.botID, req.body,function(err,bot){
        if(err) {
            res.status(400).json({msg: "Impossible de mettre à jour le bot"});
        }else {  
            Bot.findById(req.params.botID, function(err, nouveauBot){
                if(nouveauBot.interface == "Discord" && nouveauBot.actif && (!bot.actif || bot.interface != "Discord")){
                    var interfaceD = new interfaceDiscord(nouveauBot.nom, nouveauBot.cerveau);
                    let indice = null;
                    for (let i =0; i<tableauInterfaces.length; i++){
                        if (tableauInterfaces[i][0]._id.equals(nouveauBot._id)){
                            indice = i;
                        }
                    }
                    if(indice) {
                        tableauInterfaces.splice(indice,1);
                    }
                    tableauInterfaces.push([nouveauBot, interfaceD]);
                    interfaceD.init();
                }else{
                    if(nouveauBot.interface == "Discord" && nouveauBot.actif){                        
                        for (let i =0; i<tableauInterfaces.length; i++){
                            if (tableauInterfaces[i][0]._id.equals(nouveauBot._id)){
                                tableauInterfaces[i][1].majCerveau(nouveauBot.cerveau);
                                tableauInterfaces[i][1].cerveau = nouveauBot.cerveau;
                            }
                        }   
                    }else{
                        if(nouveauBot.interface == "Chat" && nouveauBot.actif && (!bot.actif || bot.interface != "Chat")){
                            var interfaceC = new interfaceChat(nouveauBot.nom, nouveauBot.cerveau);
                            let indice = null;
                            for (let i =0; i<tableauInterfaces.length; i++){
                                if (tableauInterfaces[i][0]._id.equals(nouveauBot._id)){
                                    indice = i;
                                }
                            }
                            if(indice) {
                                tableauInterfaces.splice(indice,1);
                            }
                            tableauInterfaces.push([nouveauBot, interfaceC]);
                            interfaceC.init();
                        }else{
                            if(nouveauBot.interface == "Chat" && nouveauBot.actif){                        
                                for (let i =0; i<tableauInterfaces.length; i++){
                                    if (tableauInterfaces[i][0]._id.equals(nouveauBot._id)){
                                        tableauInterfaces[i][1].majCerveau(nouveauBot.cerveau);
                                        tableauInterfaces[i][1].cerveau = nouveauBot.cerveau;
                                    }
                                }   
                            }
                        }
                    }
                }
                res.json({msg : "Mise à jour du bot réussie"});  
            })
        }
    });

})


app.delete('/admin/:botID',function(req,res){
    Bot.findByIdAndDelete(req.params.botID,function(err,bot){
        if(err) {
            res.status(400).json({msg: "Impossible de supprimer le bot"});
        }else {
            res.json({msg : "Suppression du bot réussie"});
        }
    });
})


/*
app.get('/test', function(req,res){
    res.json(bot)
})

app.get('/cerveau/:num/a/:nom', function(req,res){
    res.json({msg: `Cerveau n°${req.params.num} assigne a ${req.params.nom}`})
})

app.post('/admin', function(req, res) {
    res.render('interfaceadmin.ejs');
});

app.put('/admin/:botnum', function(req, res) {
    res.render('interfaceadmin.ejs', {botnum: req.params.botnum});
});

app.get('/admin/:botnum', function(req, res) {
    res.render('interfaceadmin.ejs', {botnum: req.params.botnum});
});
*/





app.get('/', function (req, res) {
    res.render('chat.ejs');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
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

app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));
//module.exports = interfaceChat;