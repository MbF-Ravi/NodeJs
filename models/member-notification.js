'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let memberNotificationSchema = new Schema({

	childId : {type: String},
	nomId : {type: Number},
	dataTokenValue1 : String,
	generatedDate : {type : Date, default : Date.now},
	sentDate : {type : Date, default : Date.now},
	status : String

}, {collection : 'member_notification'});

let child = mongoose.model("member_notification", memberNotificationSchema);

module.exports = {

	MemberNotification : child
}