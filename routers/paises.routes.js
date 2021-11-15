const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Paises = require("./../model/paises"); // import do modelo pessoa

router.get('/', (req,res) => {
    res.status(200).json({message:"rota paises ok"});
});

router.get('/listar', async (req,res) => {
    await Paises.find({}).then((paises) => { //pega todo mundo do banco
        console.log(paises);
        res.status(200).json(paises);
    }).catch((err) => {
        res.status(404).json({message:"Não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Paises.findOne({ nome:nome }).then((paises) => { //findOne retorna o primeiro que der match com o item passado
        console.log(paises);
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
    }else if(!req.body.lingua){
        res.status(400).json({message: "faltou a língua"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; // nao esquecer dos returns dentro dos ifs
    }
    else if(!req.body.pib){
        res.status(400).json({message: "faltou PIB"});
        return; // nao esquecer dos returns dentro dos ifs
    }

    await Paises.create(req.body).then(() => {
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

    await Paises.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
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