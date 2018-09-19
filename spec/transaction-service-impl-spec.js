const transactionModel = require('../models/transaction').Transaction;
const transactionServiceImpl = require('../service-impl/transaction-service-impl');
const transactionResponse = require('../spec/test-io-samples').transaction;

const tranId= "TRAN00000001";
const query='{"tranId":"TRAN00000001"}'

describe("DELETE BY TRANID/", function() {
    beforeEach(function(){
      spyOn(transactionModel.prototype, 'findByTranIdAndStatus').and.callFake(function(tranId, callback) {
          return  callback (null,transactionResponse);
      });
      spyOn(transactionModel.prototype, 'deleteByTranId').and.callFake(function(tranId, callback) {
          return  callback (null,transactionResponse);
      });
  });
    it("DELETE one by TRANID", function(done) {
      console.log("DELETE")
      transactionServiceImpl.deleteBytranId(tranId,function(err, result){
          done();
      });
    });
});