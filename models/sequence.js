'use strict';

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let sequenceSchema = new Schema({
	name: String,
    sequence: Number,
	}, { collection: 'sequence' });


let sequence = mongoose.model("sequence", sequenceSchema);

let sequenceReq = new sequence({  
    "name" : "party", 
    "sequence" : 1
});

module.exports = {
    Sequence: sequence,
    SequenceReq: sequenceReq
};