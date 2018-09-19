'use strict'
const mongooseerr = require('../exceptions/custom-error');

var handleE11000 = function(error, res, next) {
  if (error.childName === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
};
childSchema.post('save', handleE11000);
childSchema.post('findOneAndUpdate', handleE11000);
childSchema.post('insertMany', handleE11000);
