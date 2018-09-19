'use strict';
const childController = require('../controller/child-controller');
const auth = require('../config/basic-jwt-auth');

module.exports = function(router){


/**
* @swagger
* /v1.0/child:
*   post:
*     tags:
*       - Child
*     description: Creates new child registration
*     produces:
*       - application/json
*     parameters:
*       - name: Child
*         description: Child object
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/ChildRequest'
*     responses:
*       200:
*         description: Successfully created
*         schema:
*           $ref: '#/definitions/Child'
*/
	router.post('/v1.0/child', childController.addChild);

	/**
* @swagger
* /v1.0/child:
*   get:
*     tags:
*       - Child
*     description: | 
*                    Returns array of child objects based on path param criteria. 
*                    path param 'childId' will return single child object details.
*                    with out passing childId in query param will return array of objects.
*     produces:
*       - application/json
*     parameters:
*       - name: childId
*         description: child Id to get a child details.
*         in: query
*         required: false
*         type: string
*     responses:
*       200:
*         description: An array of child
*         schema:
*           $ref: '#/definitions/Child'
*       404:
*         description: Returns not found error if it does not have record with that Id.
*         schema:
*           $ref: '#/definitions/ErrorModel'
*       default:
*         description: Returns unexpected error if it does not meet any required criteria
*         schema:
*           $ref: '#/definitions/ErrorModel'
*/
	router.get('/v1.0/child', childController.getChild);
/**
* @swagger
* /v1.0/child/{childId}:
*   put:
*     security:
*       - basicAuth: []
*     tags:
*       - Child
*     description: Update exsisting child based on childId
*     produces:
*       - application/json
*     parameters:
*       - name: childId
*         description: child's id has to be passed to get the details of child.
*         in: path
*         required: true
*         type: string
*       - name: ChildRequest
*         description: Object which has array of child that has to be modified.
*         in: body
*         required: true
*         schema:
*           $ref: '#/definitions/ChildRequest'
*     responses:
*       200:
*         description: Successfully updated
*         schema:
*           $ref: '#/definitions/Child'
*/
	router.put('/v1.0/child/:childId',auth.basicAuth,childController.updateChild);
};