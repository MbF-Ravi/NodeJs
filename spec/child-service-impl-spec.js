'use strict'

const childRequest = require('../spec/test-io-samples').childRequest;
const child = require('../spec/test-io-samples').child;
const childResponse = require('../spec/test-io-samples').child;
const childServiceImpl = require('../service-impl/child-service-impl');
const childModel = require('../models/child').Child;
const SequenceImpl = require('../service-impl/sequence-service');

const childId= "CH00000001";
const childName= "viki";
const touchId ="sr";
const passCode =77;
const devicedetails = '{"deviceToken": "string","deviceType": "IOS","deviceId": "string"}';
const  enableTouchId= true;
const sequenceFor='child';
const query ='{}';
const param='{new: true}'

describe("POST /", function() {
    beforeEach(function(){
      spyOn(SequenceImpl, 'getSequence').and.callFake(function(sequenceFor, callback) {
          return callback(null,2);
      });
      spyOn(childModel.prototype, 'createChild').and.callFake(function(childRequest,callback) {
        return callback(null,childResponse);
      });
    });
    it("create Child", function(done) {
      console.log("post service start");
      childServiceImpl.post(childRequest, function(err, result){
          expect(err).toBeNull();
          expect(result).toBeDefined();
          expect(result.childId).toEqual('CH00000001');
            done();
      });
    });
});

describe("GET /", function() {
    beforeEach(function(){
      spyOn(childModel.prototype, 'findAllChild').and.callFake(function(callback) {
          return callback(null,childResponse);
      });
  });
    it("Get all child", function(done) {
      console.log("Get all service start");
      childServiceImpl.getAll(function(err, result){
          expect(err).toBeNull();
          expect(result).toBeDefined();
          done();
      });
    });
});

describe("GET BY ID/", function() {
    beforeEach(function(){
      spyOn(childModel.prototype, 'findByChildId').and.callFake(function(childId, callback) {
          return callback(null,childResponse);
      });
  });
  it("Get by childId", function(done) {
    console.log("Get by id service start");
      childServiceImpl.getById(childId, function(err, result){
        expect(err).toBeNull();
        expect(result).toBeDefined();
        done();
    });
  });
});

describe("UPDATE BY ID/", function() {
    beforeEach(function(){
      spyOn(childModel.prototype, 'findByChildId').and.callFake(function(childId, callback) {
          return callback(null,childResponse);
      });
      spyOn(childModel.prototype, 'createChild').and.callFake(function(childRequest,callback) {
          return callback (null,childResponse);
      });
  });
    it("Update one by childId", function(done) {
      console.log("update service start")
      childServiceImpl.update(childId,childRequest,function(err, result){
          expect(err).toBeNull();
          expect(result).toBeDefined();
          done();
      });
    });
});

