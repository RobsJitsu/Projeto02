const Cidades = require("./../model/cidades"); 

function validaEntrada(res,requisicao){
    if(!requisicao.nome){
        res.status(400).json({message: "faltou o nome"});
        return true;
    }else if(!requisicao.povo){
        res.status(400).json({message: "faltou a população"});
        return true;
    }else if(!requisicao.bairros){
        res.status(400).json({message: "faltaram os bairros"});
        return true;
    }else if(!requisicao.niver){
        res.status(400).json({message: "faltou o niver"});
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
    await Cidades.find({}).then((cidades) => { 
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(404).json({message:"não foi encontrado"});
        console.error(err);
    });
}

exports.getSingle = async (req,res) => { 
    if(validaID(res,req.params.id)) return;
    await Cidades.findById(req.params.id).then((cidade) => {
        res.status(200).json(cidade);
    }).catch((err) => {
        res.status(404).json({message: "nenhuma cidade encontrada"});
        console.error(err);
    });
}

exports.postCreate = async (req,res) => { 
    if(validaEntrada(res,req.body)) return;
    await Cidades.create(req.body).then( () => {
        res.status(201).json({message: "cidade inserida"})
    }).catch((err) => {
        res.status(400).json({message: "ERRO!!!"});
        console.error(err);
    });
}

exports.putUpdate = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    if(validaEntrada(res,req.body)) return;
    await Cidades.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({message: "cidade atualizada"})
    }).catch((err) => {
        res.status(400).json({message: "ERROR"});
        console.error(err);
    });
}

exports.delDelete = async (req,res) => {
    if(validaID(res,req.params.id)) return;
    await Cidades.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({message: "cidade deletada"});
    }).catch((err) => {
        res.status(404).json({message: "nenhuma cidade encontrada"});
        console.error(err);
    });
}

