const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())

const PORT = 5000;

//Connexion à la base de données
mongoose.connect('mongodb://localhost/chatbots', {useNewUrlParser:true, useUnifiedTopology:true});
let bdd = mongoose.connection;
mongoose.set('useFindAndModify', false);

bdd.once('open', ()=>{
    console.log("La base de donnees est connectee");
})

// Recupère le modèle d'un bot dans la base
var Bot = require('./modeles/bot');

/*
POST	/admin			    Créé un nouveau ChatBot
PUT		/admin/botID		Permet de modifier les informations du bot
DELETE	/admin/botID		Permet de supprimer l'accès à Discord du ChatBot botID
GET		/admin			    Donne l'état des ChatBots créés

JSON avec les infos du bot : id, nom, cerveau attribué, autorisation à garder les infos des utilisateurs, interface (Discord, Slack, etc)
*/

app.get('/admin', function(req, res) {
    res.render('affichageBots.ejs');
});

app.get('/bots/all', function(req,res){
    // Interroge la base pour retrouver tous les bots
    Bot.find({},function(err,bots){
        if(err) {
            res.status(400).json({msg: "Une erreur a eu lieu"});
        }
        else {
            res.json({bots});
        }
    });
})

app.post('/bots/',function(req,res){
    console.log(req.body)
    res.json({})
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

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));