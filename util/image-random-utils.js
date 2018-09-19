'use strict';
const crypto = require('crypto');
const Props = require('../util/api-properties');
//var salt = "pikazzasecretkeytoencryprtpassword".toString('base64');
const logger = require('../config/log');
const randomize = require('randomatic');

module.exports.uploadImage = (newFileName,  base64Data, next) => {

    logger.info("Uploading image starts..");
    let start=base64Data.indexOf("/")+1;
    let end=base64Data.indexOf(";");
    let formDot = "."+base64Data.substr(start,end-start);
    let form= base64Data.substr(start,end-start);
    let toReplace = new RegExp("data:image/"+form+";base64,");
    let base64 = base64Data.replace(toReplace, "");
    require("fs").writeFileSync(Props.imageRefPath.uploadPath+newFileName+formDot, base64, 'base64');
    let path = Props.imageRefPath.host+newFileName+formDot;
    logger.info("upload is completed "+path);
    return path;

};

/*module.exports.generateRandomNumber = () =>{
    console.log("number+randomNumber");
    let randomNumber = randomize('0', 5);
    console.log("number"+randomNumber);
    return randomNumber;
}*/