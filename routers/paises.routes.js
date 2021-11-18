const express = require("express"); 
const router = express.Router(); 
const PaisesController = require("./../controller/paises.controller"); 

// app.get('/', (req,res) => {
//     res.status(200).json({message:"rota index ok"});
// })

router.get('/listall', PaisesController.getAll);

router.get('/listname/:id', PaisesController.getSingle);

router.post('/add', PaisesController.postCreate);

router.put('/update/:id', PaisesController.putUpdate);

router.delete("/delete/:id", PaisesController.delDelete);

module.exports = router;