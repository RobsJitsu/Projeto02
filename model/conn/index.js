const mongoose = require("mongoose");  

async function Conn(){
    await mongoose.connect(process.env.MONGOURI)
    .then(() => {
        console.log("MongoDB esta conectado");
    }).catch((err) => { 
        console.error(err);
    });
}

module.exports = Conn; 

