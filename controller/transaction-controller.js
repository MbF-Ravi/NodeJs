'use strict';

const transactionServiceImpl = require('../service-impl/transaction-service-impl');
const transactionRequest = require('../models/transaction-request');
const logger = require('../config/log');

exports.postTransaction = (req, res, next) => {
	logger.info("transaction controller post method");
	transactionServiceImpl.postTrans(req.body, function (err, result)
	{
		if(err){
			res.send(err);
		}
		else{
			res.status(200).json(result);
		}
	});
}

exports.getTransaction = (req, res, next) => {
	logger.info("transaction controller get all trades"+req.query.type);

	if(req.query.type ==='trades' && typeof req.query.childId !== 'undefined'){
		logger.info("transaction controller get all trades"+req.query.type);
		transactionServiceImpl.getAllTrades(req.query.type, req.query.childId, function(err, result){
			if(err)
				next(err)
			else
				res.status(200).json(result);
		});
	}
	else if(req.query.type ==='approved' && typeof req.query.childId !== 'undefined'){
		logger.info("transaction controller get by type"+req.query.type);
		transactionServiceImpl.getAllApproved(req.query.type, req.query.childId, function(err, result){
			if(err)
				next(err)
			else
				res.status(200).json(result);
		});
	}
	else if(req.query.type ==='donates' && typeof req.query.childId !== 'undefined'){
		logger.info("transaction controller get all Donates"+req.query.type);
		transactionServiceImpl.getAllDonate(req.query.type, req.query.childId, function(err, result){
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}
	else if(typeof req.query.childId !== 'undefined' && typeof req.query.type === 'undefined'){
		logger.info("transaction controller get by childId"+req.query.childId);
		transactionServiceImpl.getByChildId(req.query.childId, function (err, result){
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}
	else{
		transactionServiceImpl.getAll(req,res, function (err, result){
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}	
}

exports.updateTransaction = (req, res, next) => {
	logger.info("transaction controller updating method");
	if(req.body.tradeType ==="SWAP"){
		transactionServiceImpl.update(req.body, function (err, result){
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}else{
		transactionServiceImpl.updateStatus(req.body, function (err, result){
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}
	
}

exports.deleteTransaction = (req, res, next) => {
	if(req.params.tranId){
		logger.info("transaction controller delete by tranId"+req.params.tranId);
		transactionServiceImpl.deleteBytranId(req.params.tranId, function (err, result)
		{
			if(err){
				next(err)
			}
			else{
				res.status(200).json(result);
			}
		});
	}
}