"use strict";

function NotFoundError(error) {
  this.name = "NotFoundError";
  this.message = error;
}
module.exports = NotFoundError;