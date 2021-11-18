const express = require("express"); 
const router = express.Router(); 
const EstadosController = require("./../controller/estados.controller"); 

router.get('/listall', EstadosController.getAll);

router.get('/listname/:id', EstadosController.getSingle);

router.post('/add', EstadosController.postCreate);

router.put('/update/:id', EstadosController.putUpdate);

router.delete("/delete/:id", EstadosController.delDelete);

module.exports = router;