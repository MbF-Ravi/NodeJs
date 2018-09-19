'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const deviceType = ['DESKTOP', 'ANDROID', 'IOS'];

let deviceDetailsSchema = new Schema({

	deviceId : String,
	deviceType : {type: String, enum: deviceType},
	deviceToken : String
});

function validateName(str){
	let objRegExp = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
 	return objRegExp.test(str)
}
	
let childRequestSchema = new Schema({

	childName : {
		type: String,
		trim: true,
		required: true,
		minlength: 3,
		validate: [validateName, 'Please provide a valid name with only characters']
	},
	deviceDetails : deviceDetailsSchema,
	touchId : String,
	passCode : Number,
	childImage : String

});

let childRequest = mongoose.model("childRequest", childRequestSchema);

module.exports = {

	ChildRequest : childRequest
}