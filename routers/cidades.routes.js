const express = require("express"); 
const router = express.Router(); 
const Cidades = require("./../model/cidades"); 

router.get('/listar', async (req,res) => {
    await Cidades.find({}).then((cidades) => { 
        console.log(cidades);
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(404).json({message:"não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:id', async (req,res) => { 
    await Cidades.findById(req.params.id).then((cidade) => {
        if(cidade == null){ 
            res.status(404).json({message: "nao encontrado"});
        }else{
            res.status(200).json(cidade);
        }
    }).catch((err) => {
        res.status(404).json({message:"não encontrado"});
        console.error(err);
    });
});

router.post('/adicionar', async (req,res) => { 

    if(!req.body.nome){
        res.status(400).json({message: "faltou nome"});
        return;
    }else if(!req.body.bairros){
        res.status(400).json({message: "faltaram os bairros"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; 
    }
    else if(!req.body.niver){
        res.status(400).json({message: "faltou data de aniversário"});
        return; 
    }

    await Cidades.create(req.body).then(() => {
        res.status(201).json({message: "cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "algo errado"});
        console.error(err);
    })
});

router.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({message: "faltando id"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;
    }else if(!req.body.bairros){
        res.status(400).json({message: "faltaram os bairros"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return;
    }
    else if(!req.body.niver){
        res.status(400).json({message: "faltou data de aniversário"});
        return;
    }

    await Cidades.updateOne({ _id:id},req.body).then(() => { 
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "ERROR FATAL (sempre quis fazer isso rs) !!"});
    });
});

router.delete("/deletar/:id", async (req,res) => {
    const id  = req.params.id;

    await Cidades.findByIdAndDelete(id).then(() => {
        res.status(200).json({message: "DELETADO"});
    }).catch((err) => {
        res.status(404).json({message: "não encontrado"});
        console.error(err);
    });
})

module.exports = router;