const express = require("express"); 
const router = express.Router(); 
const Paises = require("./../model/paises"); 

router.get('/listar', async (req,res) => {
    await Paises.find({}).then((paises) => { 
        console.log(paises);
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message:"Não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:id', async (req,res) => {
    await Paises.findById(req.params.id).then((paises) => { 
        if(paises == null){ 
            res.status(404).json({message: "nao encontrado"});
        }else{
            res.status(200).json(paises);
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
    }else if(!req.body.lingua){
        res.status(400).json({message: "faltou a língua"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; 
    }
    else if(!req.body.pib){
        res.status(400).json({message: "faltou PIB"});
        return; 
    }

    await Paises.create(req.body).then(() => {
        res.status(201).json({message: "cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "algo errado"});
        console.error(err);
    })
});

router.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({message: "esta faltando id na URL"});
        return;
    }else if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;
    }else if(!req.body.lingua){
        res.status(400).json({message: "faltou a língua"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return;
    }
    else if(!req.body.pib){
        res.status(400).json({message: "faltou o PIB"});
        return;
    }

    await Paises.updateOne({ _id:id},req.body).then(() => { 
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "ERRO!!"});
    });
});

router.delete("/deletar/:id", async (req,res) => {
    const id  = req.params.id;

    await Paises.findByIdAndDelete(id).then(() => {
        res.status(200).json({message: "DELETADO"});
    }).catch((err) => {
        res.status(404).json({message: "não encontrado"});
        console.error(err);
    });
})

module.exports = router;