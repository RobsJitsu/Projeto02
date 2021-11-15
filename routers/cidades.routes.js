const express = require("express"); //import do express
const router = express.Router(); //define app como express
const Cidades = require("./../model/cidades"); // import do modelo pessoa

router.get('/', (req,res) => {
    res.status(200).json({message:"rota cidades ok"});
});

router.get('/listar', async (req,res) => {
    await Cidades.find({}).then((cidade) => { //pega todo mundo do banco
        console.log(cidades);
        res.status(200).json(cidades);
    }).catch((err) => {
        res.status(404).json({message:"não foi encontrado"});
        console.error(err);
    });
});

router.get('/listarnome/:nome', async (req,res) => {
    const nome = req.params.nome;  //recebendo nome por parametro
    await Cidades.findOne({ nome:nome }).then((cidade) => { //findOne retorna o primeiro que der match com o item passado
        console.log(cidade);
        if(cidade == null){ //validando se retorna null 
            res.status(404).json({message: "nao encontrado"});
        }else{
            res.status(200).json(cidade);
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
    }else if(!req.body.bairros){
        res.status(400).json({message: "faltaram os bairros"});
        return;
    }
    else if(!req.body.povo){
        res.status(400).json({message: "faltou população"});
        return; // nao esquecer dos returns dentro dos ifs
    }
    else if(!req.body.niver){
        res.status(400).json({message: "faltou data de aniversário"});
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

    await Cidades.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
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