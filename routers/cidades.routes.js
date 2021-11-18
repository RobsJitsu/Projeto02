const express = require("express"); 
const router = express.Router(); 
const CidadesController = require("./../controller/cidades.controller"); 

router.get('/listall', CidadesController.getAll);

router.get('/listname/:id', CidadesController.getSingle);

router.post('/add', CidadesController.postCreate);

router.put('/update/:id', CidadesController.putUpdate);

router.delete("/delete/:id", CidadesController.delDelete);

module.exports = router;