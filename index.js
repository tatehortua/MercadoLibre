const express = require('express');
const { isMutant } = require('./isMutant');
const app = express();


app.use(express.json());

app.post('/mutant', (req, resp) => {
    let body = req.body.dna;
    let mutante = isMutant(body);
    if (mutante){
        return resp.status(200).send();
    }
    else{
        return resp.status(403).send();
    }    
})

app.listen(3000, () => console.log("Server is running on port 3000"));



