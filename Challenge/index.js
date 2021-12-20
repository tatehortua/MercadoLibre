const isMutant = (dna) => {
    let contador = 0;
    

    for (let i = 0; i < dna.length; i++) {
        contador += findSequence(dna[i])
        if(contador > 1)
            return true
    }

    let columns = generateColumns(dna);
    for (let i = 0; i < columns.length; i++) {
        contador += findSequence(columns[i])
        if(contador > 1)
            return true
    }

   let diagonals = generateDiagonals(dna);
   for (let i = 0; i < diagonals.length; i++) {
         contador += findSequence(diagonals[i])
         if(contador > 1)
            return true   
   }

   let diagonalslInversas = generateDiagonalsInversas(dna)
   for (let i = 0; i < diagonalslInversas.length; i++) {
       contador += findSequence(diagonalslInversas[i])
       if(contador > 1)
            return true      
   }

    return false;
}

const findSequence = (input)  => {
    let contador = 0;
    for (let i = 0; i<=input.length-4; i++){
        if (input[i] == input[i+1] && input[i+1] == input[i+2] && input[i+2] == input[i+3]){
            contador ++
            i += 3
        }
    } 
    return contador;
}


const generateColumns = (input) => {
    let columns = [];
    for (let j = 0; j<input.length; j++){
        columns.push(input[0][j])
    }

    for (let i = 1; i<input.length; i++){
        for (let j = 0; j<input.length; j++){
            columns[j] = columns[j] + input[i][j]
        }
    }   
    return columns;
}

const generateDiagonals = (input) => {
    let diagonales = [];

    for (let contador = 0; contador < input.length; contador++) {
        let j = 0;
        let textod = "";
        for (let i = contador; i >= 0; i--) { 
            textod += input[i][j];
            j++;
        }
        diagonales.push(textod)
    }

    for (let contador = 1;  contador < input.length; contador++) {
        let j = contador;
        let textod = "";
        for (let i = input.length-1; i >= contador; i--) {
            textod += input[i][j];
            j++
        }
        diagonales.push(textod);
    }

    return diagonales;
}

const generateDiagonalsInversas = (input) => {

    let array = [];

    for (let contador = input.length-1; contador >= 0; contador--) {
        let j = 0;
        let textodi = "";
        for (let i = contador; i < input.length; i++) {
            textodi += input[i][j]
            j++;
        }
        array.push(textodi);
    }

    for (let contador = 1; contador < input.length; contador++) {
        let i = 0;
        let textoi = "";
        for (let j = contador; j < input.length; j++) {
            textoi += input[i][j]
            i ++;
        }
        array.push(textoi);

    }

    return array;
}

let dna = ["TTGCGA","CAGTGC","TTATGT","AGAAGG","CCCTA","TCACTG"];

let contador = isMutant(dna)
console.log(contador);
