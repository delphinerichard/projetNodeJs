const express = require('express');
const app = express();

const PORT = 5000;

const botID = 1; //Pour tests

var myRouter = express.Router();

// On travaille sur l'URI /admin
myRouter.route('/admin')

//GET sur l'URI /admin donne l'état de tous les bots créés
.get(function(req, res) {
    res.render('interfaceadmin.ejs');
})

//POST sur l'URI /admin permet de créer un nouveau bot
.post(function(req, res) {
    res.render('interfaceadmin.ejs');
});


// On travaille sur l'URI /admin/botID
myRouter.route('/admin/'+botID)
//PUT sur l'URI /admin/botID permet de modifier le bot ayant pour identifiant botID (ajout de cerveaux, ajout d'accès à Discord...)
.put(function(req, res) {
    res.render('interfaceadmin.ejs');
})
//DELETE sur l'URI /admin/botID permet de supprimer l'accès à Dicord du bot ayant pour identifiant botID
.delete(function(req, res) {
    res.render('interfaceadmin.ejs');
});


// On travaille sur l'URI / (ie localhost:5000)
myRouter.route('/')

.all(function(req,res){
    //res.json({message : "Bienvenue sur le site d'administration des ChatBots. Veuillez vous rendre à l'adresse localhost:5000/admin pour gérer les ChatBots.", methode : req.method});
    res.json("Bienvenue sur le site d'administration des ChatBots. Veuillez vous rendre à l'adresse localhost:5000/admin pour gérer les ChatBots.");
});

app.use(myRouter);

app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));


