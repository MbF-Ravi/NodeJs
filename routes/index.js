'use strict';

//var swaggerSpec = require('../server');
const swaggerSpec = require('../config/app');
const logger = require('../config/log');

module.exports = function(router){

	router.get('/welcome', function(req, res) {
  		res.status(200).json({ "name":"Welcome to givazon API with Node.js" });
	});

	router.get('/swagger.json', function(req, res) {
		res.status(200).send(swaggerSpec.SwaggerSpec);
	});
}
// Model class definition for Swagger Spec.

/**
* @swagger
* definitions:
*   TransactionRequest:
*     properties:
*       tranImage :
*           type : string   
*       tradeType:
*         type: string
*         default: SWAP
*         enum:
*           - SWAP
*           - DONATE 
*       sender:
*         type: string
*       tradeStatus:
*         type: string
*         default: APPROVED
*         enum:
*           - COMPLETED
*           - ACCEPTED
*           - REQUEST
*           - CANCEL
*           - APPROVED
*   Transaction:
*     properties:
*       tranId :
*           type : string 
*       tranImage :
*           type : string   
*       tradeType:
*         type: string
*         default: SWAP
*         enum:
*           - SWAP
*           - DONATE
*       tradeId:
*         type: string
*       tranDate:
*         type: Date
*       tradeStatus:
*         type: string
*         default: APPROVED
*         enum:
*           - COMPLETED
*           - ACCEPTED
*           - REQUEST
*           - CANCEL
*           - APPROVED
*       sender:
*           type: string
*       receiver: 
*           type: string
*   ErrorModel:
*     required:
*      - code
*      - name
*      - message
*     properties:
*       code: 
*         type: string
*       name:
*         type: string
*       message: 
*         type: string
*   UpdateTransaction:
*     properties:
*       senderTranId :
*           type : string   
*       tradeType:
*         type: string
*         default: SWAP
*         enum:
*           - SWAP
*           - DONATE 
*       senderTradeStatus:
*         type: string
*         default: APPROVED
*         enum:
*           - COMPLETED
*           - ACCEPTED
*           - REQUEST
*           - CANCEL
*           - APPROVED
*       receiverTranId:
*         type: string
*       receiverTradeStatus:
*         type: string
*         default: APPROVED
*         enum:
*           - COMPLETED
*           - ACCEPTED
*           - REQUEST
*           - CANCEL
*           - APPROVED
*       sender:
*         type: string
*       receiver:
*         type: string
*   DeviceDetails:
*     properties:
*       deviceId:
*         type: string
*       deviceType:
*         type: string
*         enum:
*           - ANDROID
*           - IOS
*           - DESKTOP
*       deviceToken:
*         type: string
*   ChildRequest:
*     properties:
*       childName :
*           type : string 
*       enableTouchId :
*           type : boolean   
*       touchId:
*         type: string
*       passCode:
*         type: number
*       childImage:
*         type: string
*       deviceDetails : 
*           $ref: '#/definitions/DeviceDetails'
*   Child:
*     properties:
*       childId :
*           type : string 
*       childName :
*           type : string 
*       enableTouchId :
*           type : boolean   
*       touchId:
*         type: string
*       passCode:
*         type: number
*       childImage:
*         type: string
*       deviceDetails : 
*           $ref: '#/definitions/DeviceDetails'
*   DeleteResponse:
*     properties:
*       tranId :
*           type : string 
*/