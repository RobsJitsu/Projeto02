const mongoose = require("mongoose");  //importando o mongoose

const estadosModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    regiao: { type: String, required: true },
    povo: { type: Number },
    salario: { type: Date, default: Date.now } //default, valor padrao caso nao seja passado
});

const Estados = mongoose.model("Estados",estadosModel); // a criacao do modelo na colection Pessoas

module.exports = Estados; //exportando o modelo pronto

