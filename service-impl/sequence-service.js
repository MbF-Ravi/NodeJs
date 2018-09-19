'use strict';

const pad = require('pad-number');
const Sequence = require('../models/sequence').Sequence;
const logger = require('../config/log');

module.exports.getSequence = (name, next) => {
	var currentId;
	logger.info("sequence-"+name);
  	Sequence.findOne({"name":name}, function (err, result) {
		if(err){
			logger.info("Sequence collection error with "+err);
			next(err);
		} 
		else{
			currentId = parseInt(result.sequence);
			result.sequence = currentId+1;
			result.save();
			logger.log("The Sequence Id of new "+name+" record is "+currentId);
			next(null,pad(currentId,7));
		}
	});

};