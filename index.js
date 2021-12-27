const express = require('express');
const mongoose = require('mongoose');
const { isMutant, validArray } = require('./business/isMutant');
const { Mutant } = require('./model/mutant');
const app = express();

let port = process.env.PORT || 3000;

app.use(express.json());

app.post('/mutant', (req, resp) => {
    let body = req.body.dna;

    if(!validArray(body)){
        return resp.status(400).send("Invalid Array, please check that the matrix is nxn");
    }

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
            $facet: {
                ismutant: [
                    {$match: {ismutant: true}},
                    {$count: "ismutant"}
                ],
                notmutant: [
                    {$match: {ismutant: false}},
                    {$count: "notmutant"}
                ],
            }
        },
        {
            $project:{
                count_mutant_dna: {$arrayElemAt: ["$ismutant.ismutant", 0]},
                count_human_dna: {$arrayElemAt: ["$notmutant.notmutant", 0]}
            }
        },
        {
            $project:{
                count_mutant_dna: 1,
                count_human_dna: 1,
                ratio: {$divide: ["$count_mutant_dna", "$count_human_dna",]}
            }
        }
    ]);


    resp.json(docs[0]);
})

mongoose.connect('mongodb://127.0.0.1:27017/mutantdb', (err, db)=>{
    
    if(err){
        throw err
    }
    console.log("BD conectada exitosamente")

})


app.listen(port, () => console.log("Server is running on port "+port));
