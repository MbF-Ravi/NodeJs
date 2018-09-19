'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const tradeType = ['SWAP', 'DONATE'];
const tradeStatus = ['COMPLETED', 'ACCEPTED','REQUEST','CANCEL','APPROVED'];

let transactionSchema = new Schema({

	tranId : {type: String, unique: true},
	tranImage : String,
	tradeId : Number,
	tradeType : {type: String, enum: tradeType},
	tranDate : {type: Date },
	tradeStatus : {type: String, enum: tradeStatus},
	sender : String,
	receiver : String,
	tradeDate : {type: Date },

}, {collection : 'transaction'});

transactionSchema.methods.findByTranIdAndStatus = (tranId, callback) => {
	return transaction.findOne({"tranId" :tranId,"tradeStatus":'APPROVED'}, callback);
}

transactionSchema.methods.deleteByTranId = (tranId, callback) => {
	return transaction.remove({"tranId" :tranId}, callback);
}

let transaction = mongoose.model("transaction", transactionSchema);

module.exports = {

	Transaction : transaction
}