'use strict'

const async = require('async')
const transaction = require('../models/transaction').Transaction;
const SequenceImpl = require('../service-impl/sequence-service');
const _ = require('lodash');
const transactionRequest = require('../models/transaction-request');
const logger = require('../config/log');
const utils = require('../util/image-random-utils');
const child = require('../models/child').Child;
const BadRequestError = require('../exceptions/bad-request-error');
const NotFoundError = require('../exceptions/not-found-error');
const memberNotification = require('../models/member-notification').MemberNotification;

module.exports.postTrans = (transactionRequest, next) =>{
	let trans = new transaction(transactionRequest);
	logger.info("transaction post service");
	async.waterfall([
		function(callback){
			child.findOne({"childId" : transactionRequest.sender}, function(err, childResult){
				if(err)
					callback(err);
				if(_.isEmpty(childResult)){
					callback(new NotFoundError("sender not found with this Id"+transactionRequest.sender));
				}else
					callback(null,childResult);
			});
		},
		function(childResult, callback){
			SequenceImpl.getSequence("transaction", function(err, sequenceId){
				if (err){
					callback(err);
				}
				if(sequenceId){
					callback(null,childResult,sequenceId);
				}
			});
		},
		function(childResult, sequenceId, callback){
			let randomId;
			if(transactionRequest.tradeType === "DONATE"){
				SequenceImpl.getSequence("randomNumber", function(err, randomId){
					console.log("random"+randomId)
					if(err){
						callback(err);
					}
					if(randomId){
						callback(null,childResult,sequenceId,randomId);
					}
				});
			}else
				callback(null,childResult,sequenceId,randomId);
		},
		function(childResult,sequenceId,randomId, callback){
			trans.tranId = "TRAN0"+sequenceId;
			if(transactionRequest.tranImage){
				let path = utils.uploadImage(childResult.childId+"-"+Date.now()+"-"+"toy_image",transactionRequest.tranImage);
				trans.tranImage=path;
			}
			trans.sender = transactionRequest.sender;
			if(transactionRequest.tradeType === "DONATE"){
				trans.tradeId = randomId;
				trans.tradeType = transactionRequest.tradeType;
				trans.tradeDate = Date.now();
				trans.tradeStatus = transactionRequest.tradeStatus;
			}else{
				trans.tranDate = Date.now();
				trans.tradeType = transactionRequest.tradeType;
			}
			transaction.create(trans,(err, result) =>{
				if(err){
					callback(err);
				}
					callback(null, result);
			});
		}
	], function(err, result){
		if(err){
			next(err);
		}
		else{
			next(null, result);
		}
	});
}

module.exports.getAll = (req,res, next) =>{

	logger.info("get by trade status");
	transaction.find({$and: [{"tradeType":"SWAP"},{"tradeDate":null},{$or : [{"tradeStatus":"APPROVED"},{"tradeStatus":"CANCEL"}]}]}, function(err, result){
			if(!result)
				next(new NotFoundError("records not found"));
			else
				next(null, result);
			});
}

module.exports.getByChildId = (childId, next) =>{

	logger.info("get by childId");
	transaction.find({ $and: [ { "sender": childId}, { "tradeType": "SWAP" }, { $or: [ { "tradeStatus": "CANCEL" }, { "tradeStatus": "APPROVED" } ] } ] }, function(err, result){
		if(!result)
			next(new NotFoundError("records not found with this	 childId!"+childId));
		else
			next(null, result);
	});
}

module.exports.getAllTrades = (tradeType,childId, next) =>{

	logger.info("get all my trandes service-impl");
	transaction.find({ "tradeType": "SWAP", "tradeStatus": "ACCEPTED", $or: [ { "sender": childId }, { "receiver": childId } ] }, function(err, result){
		if(!result)
			next(new NotFoundError("records not found with this	 childId!"+childId));
		else
			next(null, result);
	});
}

module.exports.getAllApproved = (tradeType, childId, next) =>{

	logger.info("get all my approvals service-impl");
	transaction.find({ "tradeStatus": "APPROVED", "sender": childId }, function(err, result){
		if(!result)
			next(err);
		else
			next(null, result);
	});
}

module.exports.getAllDonate = (tradeType,childId, next) =>{
logger.info("get all my tranId service-impl");
	transaction.find({ "tradeType": "DONATE", "sender": childId, "tradeStatus": "ACCEPTED" }, function(err, result){
	if(!result){
		next(new NotFoundError("records not found with this	childId!"+childId));
	}
	else{
		next(null, result);
	}
	});
}

module.exports.update = (tranReq, next) =>{
	logger.info("updating record with type SWAP");
	async.waterfall([
		function(callback){
			console.log("senderId")
			transaction.findOne({"tranId" :tranReq.senderTranId},function(err, senderTransaction){
				if(err)
					next(err)
				else if(!senderTransaction)
					next(new NotFoundError("transaction not found with this transaction Id"+tranReq.senderTranId));
				else if(senderTransaction.tranId != tranReq.senderTranId){
					next(new NotFoundError("URL tranId is not matched with tranId"));
				}
				callback(null,senderTransaction);
			});
		},
		function(senderTransaction, callback){
			console.log("receiverId")
			transaction.findOne({"tranId" :tranReq.receiverTranId},function(err, receiverTransaction){
				if(err)
					next(err)
				else if(!receiverTransaction)
					next(new NotFoundError("transaction not found with this transaction Id"+tranReq.receiverTranId));
				else if(receiverTransaction.tranId != tranReq.receiverTranId){
					next(new NotFoundError("URL tranId is not matched with tranId"));
				}
				callback(null,senderTransaction,receiverTransaction);
			});
		},
		function(senderTransaction, receiverTransaction, callback){
			console.log("random number")
			let randomId;
			if(tranReq.senderTradeStatus === "ACCEPTED" && tranReq.receiverTradeStatus === "ACCEPTED"){
				console.log("random number for accepted status")
				SequenceImpl.getSequence("randomNumber", function(err, randomId){
					if (err){
						callback(err);
					}
					if(randomId){
						callback(null,senderTransaction,receiverTransaction,randomId);
					}
				});
			}
			else
				callback(null,senderTransaction,receiverTransaction,randomId);
		},
		function(senderTransaction, receiverTransaction,randomId, callback){
			console.log("actual service-impl")
			let senderTran = new transaction(senderTransaction);
			senderTran.tranDate = Date.now();
			senderTran.tradeStatus = tranReq.senderTradeStatus;
			senderTran.receiver = tranReq.receiver;
			senderTran.tradeId = randomId;
			console.log("sender updated")
			transaction.findOneAndUpdate({"tranId":senderTransaction.tranId},senderTran,{new: true},function(err, senderResult) {
				if(err){
					next(err);
				}
				else{
					let receiverTran = new transaction(receiverTransaction);
					receiverTran.tranDate = Date.now();
					receiverTran.tradeId = randomId;
					receiverTran.tradeStatus = tranReq.receiverTradeStatus;
					if(tranReq.receiverTradeStatus === 'ACCEPTED')
						receiverTran.receiver = tranReq.sender;
					console.log("receiver updated")
					transaction.findOneAndUpdate({"tranId":receiverTransaction.tranId},receiverTran,{new: true},function(err, receiverResult) {
						if(err){
							next(err);
						}else{
							if(receiverResult.tradeStatus==="REQUEST"){
								logger.info("request status")
								exports.requestNotification(receiverResult.sender,1,next);
							}
							else if(senderResult.tradeStatus==="ACCEPTED")
							{
								logger.info("accepted status")
								exports.requestNotification(senderResult.sender,2,next);
							}
							else if(senderResult.tradeStatus==="CANCEL")
							{
								logger.info("accepted status")
								exports.requestNotification(senderResult.sender,3,next);
							}
							callback(null, senderResult);
						}
					});
				}
			});
		}
	], function(err, result){
		if(err)
			next(err);
		else
			next(null,result);
	});
}

module.exports.updateStatus = (statusReq, next) =>{
logger.info("status is donate");
	transaction.findOne({"tranId" :statusReq.senderTranId},function(err, senderTransaction){
		if(err){
			next(err)
		}
		else if(!senderTransaction){
			next(new NotFoundError("transaction not found with this transaction Id"+senderTranId));
		}
		else if(senderTransaction.tranId != statusReq.senderTranId){
			next(new NotFoundError("URL tranId is not matched with tranId"));
		}
		else {
			let tran = new transaction(senderTransaction);
			tran.tradeStatus = statusReq.senderTradeStatus;
			tran.tradeDate = Date.now();
			transaction.findOneAndUpdate({"tranId":statusReq.senderTranId},tran,{new: true},function(err, result) {
				if(err){
					next(err);
				}else{
					next(null, result);
				}
			});
		}
	});
}

module.exports.requestNotification = (childId,nomId,next) => {
	logger.info("started notification method");
	let notification = new memberNotification();
	notification.childId = childId;
	notification.nomId = nomId;
	notification.generatedDate = Date.now();
	notification.sentDate = Date.now();
	notification.status = "NO";
	memberNotification.create(notification,(err, result) =>{
		if(err){
			return err;
		}
		if(result) {
			return result;
		}
	});
}

module.exports.deleteBytranId= (tranId, next) =>{
	logger.info("Delete service By tranId========="+tranId);
	let tran = new transaction();
	tran.findByTranIdAndStatus(tranId,function(err,result){
		if(err){
			next(err)
		}
	    else if(!result){
			next(new NotFoundError("trade status is not equal to APPROVED"));
		}
		else{
			tran.deleteByTranId(tranId, function(err, result){
				if(err){
					next(err);
				}
				else{
					next(null, {tranId:tranId})
				}
			});
		}
	});
}