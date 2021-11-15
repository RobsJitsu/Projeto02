const express = require("express"); 
const router = express.Router(); 
const Estados = require("./../model/estados"); 

router.get('/', (req,res) => {
    res.status(200).json({message:"rota estados ok"});
});

router.get('/listar', async (req,res) => {
    await Estados.find({}).then((estados) => { 
        console.log(estados);
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message:"Não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:id', async (req,res) => {
    await Estados.findById(req.params.id).then((estados) => { 
        if(estados == null){ 
            res.status(404).json({message: "nao encontrado"});
        }else{
            res.status(200).json(estados);
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
    }else if(!req.body.regiao){
        res.status(400).json({message: "faltou a região"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; 
    }
    else if(!req.body.salario){
        res.status(400).json({message: "faltou salário"});
        return; 
    }

    await Estados.create(req.body).then(() => {
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
    }else if(!req.body.regiao){
        res.status(400).json({message: "faltou a região"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return;
    }
    else if(!req.body.salario){
        res.status(400).json({message: "faltou salário"});
        return;
    }

    await Estados.updateOne({ _id:id},req.body).then(() => { 
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "ERRO!!"});
    });
});

router.delete("/deletar/:id", async (req,res) => {
    const id  = req.params.id;

    await Estados.findByIdAndDelete(id).then(() => {
        res.status(200).json({message: "DELETADO"});
    }).catch((err) => {
        res.status(404).json({message: "não encontrado"});
        console.error(err);
    });
})

module.exports = router;