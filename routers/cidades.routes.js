const express = require("express"); 
const router = express.Router(); 
const CidadesController = require("./../controller/cidades.controller"); 

router.get('/listar', CidadesController.getAll);

router.get('/listarnome/:id', CidadesController.getSingle);

router.post('/adicionar', CidadesController.postCreate);

router.put('/update/:id', CidadesController.putUpdate);

router.delete("/deletar/:id", CidadesController.delDelete);

module.exports = router;