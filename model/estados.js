const mongoose = require("mongoose");  

const estadosModel = new mongoose.Schema({ 
    nome: { type: String, required: true }, 
    regiao: { type: String, required: true },
    povo: { type: Number },
    salario: { type: Number } 
});

const Estados = mongoose.model("Estados",estadosModel); 

module.exports = Estados; 

