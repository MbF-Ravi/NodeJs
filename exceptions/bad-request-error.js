"use strict";

function BadRequestError(error) {
	
  this.name = "BadRequestError";
  this.message = error;
  //this.code = code;
}
module.exports = BadRequestError;