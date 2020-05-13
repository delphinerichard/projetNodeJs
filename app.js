const express = require('express');
const app = express();

const PORT = 5000;

/*
POST	/admin			    Créé un nouveau ChatBot
PUT		/admin/botID		Permet de modifier les informations du bot
DELETE	/admin/botID		Permet de supprimer l'accès à Discord du ChatBot botID
GET		/admin			    Donne l'état des ChatBots créés

JSON avec les infos du bot : id, nom, cerveau attribué, autorisation à garder les infos des utilisateurs, interface (Discord, Slack, etc)
*/

app.get('/admin', function(req, res) {
    res.render('interfaceadmin.ejs');
});

app.post('/admin', function(req, res) {
    res.render('interfaceadmin.ejs');
});

app.put('/admin/:botnum', function(req, res) {
    res.render('interfaceadmin.ejs', {botnum: req.params.botnum});
});

app.get('/admin/:botnum', function(req, res) {
    res.render('interfaceadmin.ejs', {botnum: req.params.botnum});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));