const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Estados = require("./../model/estados"); // import do modelo pessoa

router.get('/', (req,res) => {
    res.status(200).json({message:"rota estados ok"});
});

router.get('/listar', async (req,res) => {
    await Estados.find({}).then((estados) => { //pega todo mundo do banco
        console.log(estados);
        res.status(200).json(estados);
    }).catch((err) => {
        res.status(404).json({message:"Não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Estados.findOne({ nome:nome }).then((estados) => { //findOne retorna o primeiro que der match com o item passado
        console.log(estados);
        if(estados == null){ //validando se retorna null 
            res.status(404).json({message: "nao encontrado"});
        }else{
            res.status(200).json(estados);
        }
    }).catch((err) => {
        res.status(404).json({message:"não encontrado"});
        console.error(err);
    });
});

router.post('/adicionar', async (req,res) => { //add nova pessoa no banco

    //validando as entradas do usuario
    if(!req.body.nome){
        res.status(400).json({message: "faltou nome"});
        return;
    }else if(!req.body.regiao){
        res.status(400).json({message: "faltou a região"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; // nao esquecer dos returns dentro dos ifs
    }
    else if(!req.body.salario){
        res.status(400).json({message: "faltou salário"});
        return; // nao esquecer dos returns dentro dos ifs
    }

    await Pessoa.create(req.body).then(() => {
        res.status(200).json({message: "cadastrado com sucesso"});
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

    await Estados.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
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