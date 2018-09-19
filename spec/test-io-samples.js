let child = {
  "childId": "CH00000001",
  "childName": "viki",
  "touchId": "sr",
  "passCode": 77,
  "childImage": "http://192.168.0.221:8080/images/CH00000009-1507870254582-child_Image.jpeg",
  "deviceDetails": {
    "deviceToken": "string",
    "deviceType": "IOS",
    "deviceId": "string",
  },
  "__v": 0,
  "enableTouchId": true
}

let childRequest = {
  "childName": "string",
  "enableTouchId": true,
  "touchId": "sr",
  "passCode": 10,
  "childImage": "http://192.168.0.221:8080/images/CH00000009-1507870254582-child_Image.jpeg",
  "deviceDetails": {
  	"deviceId": "string",
    "deviceType": "ANDROID",
    "deviceToken": "string"
  }
}
let transaction = { 
    "tranDate" : "2017-10-13T14:28:54.505+0000", 
    "tranId" : "TRAN0000001", 
    "tradeType" : "SWAP", 
    "sender" : "CH00000001", 
    "tradeStatus" : "APPROVED"
}

module.exports = {
child,	
childRequest,
transaction
};