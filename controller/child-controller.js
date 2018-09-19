'use strict';

const childServiceImpl = require('../service-impl/child-service-impl');
const childRequest = require('../models/child-request');
const logger = require('../config/log');

exports.getChild = (req, res, next) => {
	if(req.query.childId){
		logger.info("Getting child by id "+req.query.childId);
		childServiceImpl.getById(req.query.childId, function (err , result){
			if (err) {
				next(err);
			} 
			else{
			res.status(200).json(result);
			}
		});
	}
	else{
		logger.info("Getting All Child....");
		childServiceImpl.getAll(function (err , result){
			if (err) {
				next(err);
			}
			else{
			res.status(200).json(result);
			}
		});
	}
};

exports.addChild = (req, res, next) => {
	logger.info("Registering new child..");
    childServiceImpl.post(req.body, function (err , result){
		if (err) {
			next(err);
		}
		else{
		res.status(200).json(result);
		}
	});
};

exports.updateChild = (req, res, next) => {
	logger.info("Updating existing child.."+req.params.childId);
    childServiceImpl.update(req.params.childId, req.body, function (err , result){
		if (err) next(err);
		res.status(200).json(result);
	});
};