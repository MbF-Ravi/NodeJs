"use strict";

function UnauthorizedAccessError(error) {
  this.name = "UnauthorizedAccessError";
  if(error instanceof Object){
  	this.message = error.message;
  }
  else{
  	this.message = error;
  }
  this.inner = error;
}
module.exports = UnauthorizedAccessError;