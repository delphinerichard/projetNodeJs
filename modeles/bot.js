const mongoose = require('mongoose');

let botSchema = mongoose.Schema({
    nom:{
        type: String,
        required:true
    },
    cerveau:{
        type: String,
        default:"standard"
    },
    sauvegardeDonnees:{
        type: Boolean,
        default:false
    },
    interface:{
        type: String,
        default:"Discord"
    },
    actif:{
        type: Boolean,
        default:false
    }
})

module.exports = mongoose.model('bots', botSchema);