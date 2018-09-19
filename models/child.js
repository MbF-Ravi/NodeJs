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

let childSchema = new Schema({

	childId : {type: String, unique: true},
	childName : {
		type: String,
		trim: true,
		required: true,
		minlength: 3,
		validate: [validateName, 'Please provide a valid name with only characters']
	},
	childImage : String,
	enableTouchId : {type : Boolean, default : false},
	deviceDetails : deviceDetailsSchema,
	touchId : String,
	passCode : Number

}, {collection : 'child'});

childSchema.methods.createChild = (child, callback) =>{

	return child.save(child,callback);
};

childSchema.methods.findAllChild = (cb) => {

  return child.find({}, cb);
};

childSchema.methods.findByChildId = (childId,callback) =>{
	
	return child.findOne({"childId" : childId}, callback);
}


let child = mongoose.model("child", childSchema);

module.exports = {

	Child : child
}