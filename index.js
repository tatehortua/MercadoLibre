const express = require('express');
const { isMutant } = require('./isMutant');
const app = express();

let port = process.env.PORT || 3000;

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

app.listen(port, () => console.log("Server is running on port "+port));



