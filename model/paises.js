const mongoose = require("mongoose");  //importando o mongoose

const paisesModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    lingua: { type: String, required: true },
    povo: { type: Number },
    pib: { type: Date, default: Date.now } //default, valor padrao caso nao seja passado
});

const Paises = mongoose.model("Paises",paisesModel); // a criacao do modelo na colection Pessoas

module.exports = Paises; //exportando o modelo pronto