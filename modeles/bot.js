const mongoose = require('mongoose');

let botSchema = mongoose.Schema({
    nom:{
        type: String
    },
    cerveau:{
        type: String
    },
    sauvegardeDonnees:{
        type: Boolean
    },
    interface:{
        type: String
    },
    actif:{
        type: Boolean
    }
})

module.exports = mongoose.model('bots', botSchema);