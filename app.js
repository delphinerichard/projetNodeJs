const express = require('express');
const app = express();

const PORT = 5000;

//GET sur l'URI /admin donne l'état de tous les bots créés
app.get('/admin/', function(req, res) {
    res.render('interfaceadmin.ejs');
});

//POST sur l'URI /admin permet de créer un nouveau bot
app.post('/admin/', function(req, res) {
    res.render('interfaceadmin.ejs');
});

//PUT sur l'URI /admin/botID permet de modifier le bot ayant pour identifiant botID (ajout de cerveaux, ajout d'accès à Discord...)

//DELETE sur l'URI /admin/botID permet de supprimer l'accès à Dicord du bot ayant pour identifiant botID


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));


