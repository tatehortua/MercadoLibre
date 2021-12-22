const mongoose = require("mongoose");

const MutantSchema = new mongoose.Schema({
  dna: {
    type: String,
    required: true
  },
  ismutant: {
    type: Boolean,
    required: true
  },
  fecha: {
      type: Date,
      required: false,
      default: Date.now
  }

});

const Mutant = mongoose.model("Mutant", MutantSchema);

module.exports.Mutant = Mutant;