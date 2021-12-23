const express = require('express');
const mongoose = require('mongoose');
const { isMutant } = require('./business/isMutant');
const { Mutant } = require('./model/mutant');
const app = express();

let port = process.env.PORT || 3000;

app.use(express.json());

app.post('/mutant', (req, resp) => {
    let body = req.body.dna;
    let mutante = isMutant(body);

    const mutant = new Mutant();

    mutant.dna = JSON.stringify(body);
    mutant.ismutant = mutante;

    mutant.save();

    if (mutante){
        return resp.status(200).send();
    }
    else{
        return resp.status(403).send();
    }    
})

app.get('/stats', async (req, resp) =>{
   
    //Consultar base de datos

    let respuesta = {};

    let docs = await Mutant.aggregate([
        {
        $group: {
            _id: '$ismutant',
            count: { $sum: 1 }
        }
        }
    ]);

    // docs = [ {_id: true, count: 3}, {_id: false, count: 2} ]

    for (let i = 0; i < docs.length; i++) {
        if(docs[i]._id == true ){
            respuesta.count_mutant_dna = docs[i].count;
        }
        else{
            respuesta.count_human_dna = docs[i].count;
        }
        
    }

    // { count_mutant_dna: 3, count_human_dna: 2, ratio: 3/4}

    respuesta.ratio = respuesta.count_mutant_dna / respuesta.count_human_dna;

    resp.json(respuesta);

})

mongoose.connect('mongodb://127.0.0.1:27017/mutantdb', (err, db)=>{
    
    if(err){
        throw err
    }
    console.log("BD conectada exitosamente")

})


app.listen(port, () => console.log("Server is running on port "+port));



