const mongoose = require("mongoose");  

const cidadesModel = new mongoose.Schema({ 
    nome: { type: String, required: true }, 
    bairros: { type: String, required: true },
    povo: { type: Number },
    niver: { type: Date, default: Date.now } 
});

const Cidades = mongoose.model("Cidades",cidadesModel); 

module.exports = Cidades; 