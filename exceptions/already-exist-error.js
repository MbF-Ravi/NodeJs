"use strict";

function AlreadyExistError(error) {
	
  this.name = "AlreadyExistError";
  this.message = error;
  //this.code = code;
}
module.exports = AlreadyExistError;