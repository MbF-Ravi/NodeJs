'use strict'
const child = require('../models/child').Child;
const AlreadyExistError = require('../exceptions/already-exist-error');
const apiUtils = require('../util/image-random-utils');
const NotFoundError = require('../exceptions/not-found-error');
const _ = require('lodash');
const childRequest = require('../models/child-request');
const BasicOrJwtToken = require('../config/basic-jwt-auth');
const SequenceImpl = require('../service-impl/sequence-service');
const logger = require('../config/log');
const async = require('async');

module.exports.post = (childRequest, next) => {
     let ch = new child(childRequest);
    logger.info("child service post method")
    SequenceImpl.getSequence("child", function(err, sequenceId){
        if (err){
            next(err);
        }
        else{
           
            ch.childId = "CH0"+sequenceId;
            ch.childName = childRequest.childName;
            if(childRequest.deviceDetails){
                _.assign(childRequest.deviceDetails);
            }
            ch.createChild(ch,(err, result) =>{
                if(err){
                    next(err);
                }
                else{
                    next(null,result);
                }
            });
        }
    });
}


module.exports.getAll = (next) => {
    let ch = new child();
    ch.findAllChild(function(err, result) {
        if (err) 
        next(err);
        next(null, result);
    }); 
}

module.exports.getById = (childId, next) => {
    logger.info("Getting child by Child Id")
    let ch = new child();
    ch.findByChildId(childId, function(err, result) {
        if (err){
            next(err);          
        }
        if(!result) {
                next(new NotFoundError("There is no Records found for given Child "+childId));
        }
        else{
            next(null, result);
        }   
    });     
}


module.exports.update = (childId, childReq, next) => {
    logger.info("Update post service");
    let ch = new child();
    async.waterfall([
        function(callback){
            ch.findByChildId(childId, function(err, OneChild){
                if(err)
                    callback(err)
                else if(!OneChild)
                    callback(new NotFoundError("There is no Records found for child id "+childId));
                else if(OneChild.childId != childId)
                    callback(new NotFoundError("URL ChildId is not matched with childId"));
                else
                {
                    let ch = new child(OneChild);
                    if(childReq.childImage){
                        let path = apiUtils.uploadImage(OneChild.childId+"-"+Date.now()+"-"+"child_Image",childReq.childImage);
                        ch.childImage=path;
                    }
                    ch.childName = childReq.childName;
                    ch.enableTouchId = childReq.enableTouchId;
                    ch.touchId = childReq.touchId;
                    ch.passCode = childReq.passCode;
                    let device;
                    if(childReq.deviceDetails){
                        ch.deviceDetails= _.assign(childReq.deviceDetails);
                        callback(null,ch);
                    }
                }
            });
        },
        function(ch, callback){
            ch.createChild(ch,function(err, result) {
                if(err){
                    callback(err);
                }
                else{
                    callback(null, result);
                }   
            });
        }
    ],function(err, result){
            if(err){
                next(err);
            }
            else{
                next(null, result);
            }
        });
}