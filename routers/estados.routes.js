const express = require("express"); 
const router = express.Router(); 
const EstadosController = require("./../controller/estados.controller"); 

router.get('/listar', EstadosController.getAll);

router.get('/listarnome/:id', EstadosController.getSingle);

router.post('/adicionar', EstadosController.postCreate);

router.put('/update/:id', EstadosController.putUpdate);

router.delete("/deletar/:id", EstadosController.delDelete);

module.exports = router;