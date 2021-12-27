var assert = require('assert');
var request = require('supertest');
const app = require('../index');
const { findSequence, generateColumns, generateDiagonals, generateDiagonalsInversas, isMutant, validArray} = require("../business/isMutant");
var request  = request('http://localhost:3000')

describe('findSequence', function() {
   
    it('It should return 1, if it finds more than 4 consecutive letters', function() {
        //ARRANGE
        var input = "ATTTTCAAT";
        var expectedOutput = 1;

        //ACT
        var realOutput = findSequence(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return 0, if does not find any 4 consecutive letters', function() {
        //ARRANGE
        var input = "TAGTAAAT";
        var expectedOutput = 0;

        //ACT
        var realOutput = findSequence(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });

});


describe('generateColumns', function() {
    it('It should return a new matrix with the columns', function() {
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
    it('It should return a new matrix with the diagonals', function() {
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
    it('It should return a new matrix with the inverse diagonals', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = ["T", "CC", "ACA", "TGCC", "CTACT","AAAATG", "TGTGA", "GTGG", "CGT", "GC", "A"];

        //ACT
        var realOutput = generateDiagonalsInversas(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });

});

describe('validArray', function() {
    it('It should return false, if the matrix is not nxn and have valid letters', function() {
        //ARRANGE
        var input = ["GCGA","CAGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = false;

        //ACT
        var realOutput = validArray(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return true, if the matrix is nxn and have valid letters', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = true;

        //ACT
        var realOutput = validArray(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return false, if the matrix is nxn and have invalid letters', function() {
        //ARRANGE
        var input = ["ZTGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = false;

        //ACT
        var realOutput = validArray(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
    it('It should return false, if exist at least one data type different to string in array', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG", 8,"TCACTG"];
        var expectedOutput = false;

        //ACT
        var realOutput = validArray(input);

        //ASSERT
        assert.equal(realOutput, expectedOutput);
    });
});

describe('isMutant', function() {
    it('It should return true, if it meets more than two sequences', function() {
        //ARRANGE
        var input = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        var expectedOutput = true;
        

        //ACT
        var realOutput = isMutant(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });
    it('It should false, if it does not find more than two sequences', function() {
        //ARRANGE
        var input = ["GTGCGA","CAGTGC","TTATGT","AGAAGG","ACCCTA","TCACTG"];
        var expectedOutput = false;

        //ACT
        var realOutput = isMutant(input);

        //ASSERT
        assert.deepEqual(realOutput, expectedOutput);
    });
});

describe('isMutant', function() {
    describe('POST', function() {
        it('It should return 200 if does find at least two sequence ', function(done) {
            let inputJson = {
                dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
            }
            request.post('/mutant/')
            .send(inputJson)
            .expect(200, done)
        });
        it('It should return 403 if does not find at least two sequence', function(done) {
            let inputJson ={
                dna: ["TTGCGA","CAGTGC","TTATGT","AGAAGG","CCCATA","TCACTG"]
            }
            request.post('/mutant/')
            .send(inputJson)
            .expect(403, done)
        });
        it('It should return 400 if the input array is invalid', function(done) {
            let inputJson ={
                dna: ["ZTGCGA","CAGTGC","TTAT","AGAAGG","CCACTA","TCACTG"]
            }
            request.post('/mutant/')
            .send(inputJson)
            .expect(400, done)
        });
    });
});

describe('stats', function() {
    describe('GET', function() {
        it('It should return a json', function(done) {
            request.get('/stats/')
            .expect('Content-Type', /json/)
            .expect(200, done)
        });
    });    
});


