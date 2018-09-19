'use strict'

const AlreadyExistError = require('../exceptions/already-exist-error');
const ErrorCodes = require('../util/error-constants');
const UnauthorizedAccessError = require('../exceptions/unauthorized-access-error');
const BadRequestError = require('../exceptions/bad-request-error');
const NotFoundError = require('../exceptions/not-found-error');

module.exports = (router) => {
    console.log("exception mapper")
    router.use(function(err, req, res, next) {
        console.log("Error happens");
        let errorRes;
        console.log(" exception on "+err.name+" because "+err.message);
        if (err instanceof AlreadyExistError) {
            errorRes = {
                "code":ErrorCodes.ALREADY_EXIST_ERROR,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes); 
        }
        else if(err instanceof UnauthorizedAccessError){
            errorRes = {
                "code":ErrorCodes.UNAUTHORIZED_ACCESS_ERROR,
                "name":err.name,
                "message":err.message
            }
            res.status(401).json(errorRes);
        }
        else if(err instanceof BadRequestError){
            errorRes = {
                "code":ErrorCodes.BAD_REQUEST_ERROR,
                "name":err.name,
                "message":err.message
            }
            res.status(400).json(errorRes);
        }
        else if(err instanceof NotFoundError){
            errorRes = {
                "code":ErrorCodes.NOT_FOUND_ERROR,
                "name":err.name,
                "message":err.message
            }
            res.status(404).json(errorRes);
        }
        else{
            errorRes = {
                "code":ErrorCodes.UNKNOWN_ERROR,
                "name":err.name,
                "message":err.message
            }
            res.status(500).json(errorRes);
        }
        
    });
}