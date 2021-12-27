var assert = require('assert');
var request = require('supertest');
const index = require('../index');
const { findSequence, generateColumns, generateDiagonals, generateDiagonalsInversas, isMutant, validateArray} = require("../business/isMutant");
var request  = request('http://localhost:3000')

describe('findSequence', function() {
    it('It should return 0 if it does not find more than 4 consecutive letters', function() {
        //ARRANGE
        var input = "BABTBCBAAT";
        var expectedOutput = 0;

        //ACT
        var realOutput = findSequence(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return 1, if it finds more than 4 consecutive letters A,T,C,G', function() {
        //ARRANGE
        var input = "ATTTTCBAAT";
        var expectedOutput = 1;

        //ACT
        var realOutput = findSequence(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return 0, if it finds more than 4 consecutive letters differents to A,T,C,G', function() {
        //ARRANGE
        var input = "BBBBBBBAAT";
        var expectedOutput = 0;

        //ACT
        var realOutput = findSequence(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });

});


describe('generateColumns', function() {
    it('Deberia retornar una nueva matrix con las columnas', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = ["ACTACT", "TATGCC", "GGAACA", "CTTACC", "GGGGTT", "ACTGAG"];

        //ACT
        var realOutput = generateColumns(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });

});

describe('generateDiagonals', function() {
    it('Deberia retornar una nueva matrix con las diagonales', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = ["A", "CT", "TAG", "ATGC", "CGATG","TCATGA", "CCAGC", "ACGT", "CTG", "TA", "G"];

        //ACT
        var realOutput = generateDiagonals(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });

});

describe('generateDiagonalsInversas', function() {
    it('Deberia retornar una nueva matrix con las diagonales', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = ["T", "CC", "ACA", "TGCC", "CTACT","AAAATG", "TGTGA", "GTGG", "CGT", "GC", "A"];

        //ACT
        var realOutput = generateDiagonalsInversas(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });

});

describe('validateArray', function() {
    it('Deberia retornar true si la matriz no es nxn', function() {
        //ARRANGE
        var input = ["GCGA","CAGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = true;

        //ACT
        var realOutput = validateArray(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });
});

describe('isMutant', function() {
    it('Deberia retornar un True si cumple con mas de dos secuencias', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = true;
        

        //ACT
        var realOutput = isMutant(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });
    it('Deberia retornar un False si no encuentra mas de dos secuencias', function() {
        //ARRANGE
        var input = ["GTGCGA","CAGTGC","TTATGT","AGAAGG","ACCCTA","TCACTG"];
        var expectedOutput = false;

        //ACT
        var realOutput = isMutant(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });
});

// describe('isMutant', function() {
//     describe('POST', function() {
//         it('Deberia retornar un 200 si encuentra al menos un mutante ', function(done) {
//             let dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
//             request(index).post('/mutant/')
//             .send(dna)
//             .expect(200)
//             .expect('/mutant/', done)
//         });
//     });    
// });

// describe('isMutant', function() {
//     describe('POST', function() {
//         it('Deberia retornar un 403 si no encuentra almenos un mutante ', function(done) {
//             let dna = ["TTGCGA","CAGTGC","TTATGT","AGAAGG","CCACTA","TCACTG"]
//             request.post('app/mutant/')
//             .send(dna)
//             .expect(403)
//             .expect('/mutant/', done)
//         });
//     });    
// });

describe('stats', function() {
    describe('GET', function() {
        it('Deberia retornar un json', function(done) {
            request.get('/stats/')
            .expect('Content-Type', /json/)
            .expect(200, done)
        });
    });    
});


