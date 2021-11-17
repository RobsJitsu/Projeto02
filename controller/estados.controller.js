const Estados = require("./../model/estados"); 

function validaEntrada(res,requisicao){
    if(!requisicao.nome){
        res.status(400).json({message: "faltou o nome"});
        return true;
    }else if(!requisicao.povo){
        res.status(400).json({message: "faltou a população"});
        return true;
    }else if(!requisicao.regiao){
        res.status(400).json({message: "faltou a região"});
        return true;
    }else if(!requisicao.salario){
        res.status(400).json({message: "faltou o salário"});
        return true;
    }
}

function validaID(res,id){
    if(id.length != 24){
        res.status(400).json({message: "Erro no ID"});
        return true;
    }
}

exports.getAll = async (req,res) => {
    await Estados.find({}).then((estados) => { 
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message:"não foi encontrado"});
        console.error(err);
    });
}

exports.getSingle = async (req,res) => { 
    if(validaID(res,req.params.id)) return;
    await Estados.findById(req.params.id).then((estados) => {
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message: "nenhum estado encontrado"});
        console.error(err);
    });
}

exports.postCreate = async (req,res) => { 
    if(validaEntrada(res,req.body)) return;
    await Estados.create(req.body).then( () => {
        res.status(201).json({message: "estado inserido"})
    }).catch((err) => {
        res.status(400).json({message: "ERRO!!!"});
        console.error(err);
    });
}

exports.putUpdate = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    if(validaEntrada(res,req.body)) return;
    await Estados.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "estado atualizado"})
    }).catch((err) => {
        res.status(400).json({message: "ERROR"});
        console.error(err);
    });
}

exports.delDelete = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    await Estados.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "estado deletado"});
    }).catch((err) => {
        res.status(404).json({message: "nenhuma estado encontrada"});
        console.error(err);
    });
}
