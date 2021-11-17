const express = require("express"); 
const router = express.Router(); 
const PaisesController = require("./../controller/paises.controller"); 

// app.get('/', (req,res) => {
//     res.status(200).json({message:"rota index ok"});
// })

router.get('/listar', PaisesController.getAll);

router.get('/listarnome/:id', PaisesController.getSingle);

router.post('/adicionar', PaisesController.postCreate);

router.put('/update/:id', PaisesController.putUpdate);

router.delete("/deletar/:id", PaisesController.delDelete);

module.exports = router;