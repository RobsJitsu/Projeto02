const mongoose = require("mongoose");  

const paisesModel = new mongoose.Schema({ 
    nome: { type: String, required: true }, 
    lingua: { type: String, required: true },
    povo: { type: Number },
    pib: { type: Number } 
});

const Paises = mongoose.model("Paises",paisesModel); 

module.exports = Paises; 