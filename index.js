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

mongoose.connect('mongodb://127.0.0.1:27017/mutantdb', (err, db)=>{
    
    if(err){
        throw err
    }
    console.log("BD conectada exitosamente")

})


app.listen(port, () => console.log("Server is running on port "+port));



