const express = require('express');
const app = express();

const PORT = 5000;


app.get('/', function(req, res) {
    res.render('interfaceadmin.ejs');
});

app.post('/', function(req, res) {
    res.render('interfaceadmin.ejs');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(PORT, console.log('Démarrage du serveur sur le port '+PORT));


