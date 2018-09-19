'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const tradeType = ['SWAP', 'DONATE'];
const tradeStatus = ['COMPLETED', 'ACCEPTED','REQUEST','CANCEL', 'APPROVED'];


let transactionRequestSchema = new Schema({

	tranImage : String,
	tradeType : {type: String, enum: tradeType},
	tranDate : {type: Date },
	tradeStatus : {type: String, enum: tradeStatus},
	sender: String
});

let transactionRequest = mongoose.model("transactionRequest", transactionRequestSchema);

module.exports = {

	TransactionRequest : transactionRequest
}