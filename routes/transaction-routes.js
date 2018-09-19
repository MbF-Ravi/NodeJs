'use strict';


const transactionController = require('../controller/transaction-controller');
const auth = require('../config/basic-jwt-auth');

module.exports = function(router){

/**
* @swagger
* /v1.0/transaction:
*   post:
*     security:
*       - basicAuth: []
*     tags:
*       - Transaction
*     description: Creates new transaction
*     produces:
*       - application/json
*     parameters:
*       - name: Transaction
*         description: Transaction object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/TransactionRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Transaction'
*/
	router.post('/v1.0/transaction', auth.basicAuth, transactionController.postTransaction);
/**
* @swagger
* /v1.0/transaction:
*   get:
*     security:
*       - basicAuth: []
*     tags:
*       - Transaction
*     description: | 
*                    Returns array of transaction objects based on query param criteria. 
*                    query param 'childId' will return list of transaction object details.
*                    with out passing childId in query param will return array of objects based on type(trades,donates,approved).
*     produces:
*       - application/json
*     parameters:
*       - name: childId
*         description: childId to get a transaction details.
*         in: query
*         required: false
*         type: string
*       - name: type
*         description: to get a transaction details based on type.
*         in: query
*         required: false
*         type: string
*     responses:
*       200:
*         description: An array of Transaction
*         schema:
*           $ref: '#/definitions/Transaction'
*       404:
*         description: Returns not found error if it does not meet any required criteria
*         schema:
*           $ref: '#/definitions/ErrorModel'
*       default:
*         description: Returns unexpected error if it does not meet any required criteria
*         schema:
*           $ref: '#/definitions/ErrorModel'
*/
	router.get('/v1.0/transaction/', auth.basicAuth, transactionController.getTransaction);

/**
* @swagger
* /v1.0/transaction:
*   put:
*     security:
*       - basicAuth: []
*     tags:
*       - Transaction
*     description: Update exsisting transaction based on tranId
*     produces:
*       - application/json
*     parameters:
*       - name: Transaction
*         description: Transaction object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/UpdateTransaction'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Transaction'
*/
	router.put('/v1.0/transaction', auth.basicAuth, transactionController.updateTransaction);
/**
* @swagger
* /v1.0/transaction/{tranId}:
*   delete:
*     security:
*       - basicAuth: []
*     tags:
*       - Transaction
*     description: Delete exsisting child based on tranId
*     produces:
*       - application/json
*     parameters:
*       - name: tranId
*         description: tran's id has to be passed to delete the transaction.
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Successfully Deleted
*         schema:
*           $ref: '#/definitions/DeleteResponse'
*/
	router.delete('/v1.0/transaction/:tranId', auth.basicAuth, transactionController.deleteTransaction);
};