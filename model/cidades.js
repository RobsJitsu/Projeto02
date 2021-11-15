const mongoose = require("mongoose");  //importando o mongoose

const cidadesModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    bairros: { type: String, required: true },
    povo: { type: Number },
    niver: { type: Date, default: Date.now } //default, valor padrao caso nao seja passado
});

const Cidades = mongoose.model("Cidades",cidadesModel); // a criacao do modelo na colection Pessoas

module.exports = Cidades; //exportando o modelo pronto
