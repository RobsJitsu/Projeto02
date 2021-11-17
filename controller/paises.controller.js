const Paises = require("./../model/paises"); 

function validaEntrada(res,requisicao){
    if(!requisicao.nome){
        res.status(400).json({message: "faltou o nome"});
        return true;
    }else if(!requisicao.povo){
        res.status(400).json({message: "faltou a população"});
        return true;
    }else if(!requisicao.lingua){
        res.status(400).json({message: "faltou a língua"});
        return true;
    }else if(!requisicao.pib){
        res.status(400).json({message: "faltou o PIB"});
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
    await Paises.find({}).then((paises) => { 
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message:"não foi encontrado"});
        console.error(err);
    });
}

exports.getSingle = async (req,res) => { 
    if(validaID(res,req.params.id)) return;
    await Paises.findById(req.params.id).then((paises) => {
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message: "nenhum país encontrado"});
        console.error(err);
    });
}

exports.postCreate = async (req,res) => { 
    if(validaEntrada(res,req.body)) return;
    await Paises.create(req.body).then( () => {
        res.status(201).json({message: "país inserido"})
    }).catch((err) => {
        res.status(400).json({message: "ERRO!!!"});
        console.error(err);
    });
}

exports.putUpdate = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    if(validaEntrada(res,req.body)) return;
    await Paises.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "país atualizado"})
    }).catch((err) => {
        res.status(400).json({message: "ERROR"});
        console.error(err);
    });
}

exports.delDelete = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    await Paises.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "país deletado"});
    }).catch((err) => {
        res.status(404).json({message: "nenhum país encontrado"});
        console.error(err);
    });
}