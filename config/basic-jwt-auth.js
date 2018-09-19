const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../exceptions/already-exist-error');
const UnauthorizedAccessError = require('../exceptions/unauthorized-access-error');
const child = require('../models/child').Child;
const Props = require('../util/api-properties');

module.exports.fetch = (headers) => {
    if (headers && headers.authorization) {
        let authorization = headers.authorization;
        let part = authorization.split(' ');
        if (part.length === 2) {
            return part;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/*module.exports.getJwt = (childName,touchId) => {
    let jwtUserData = {
        childName: childName,
        touchId : touchId
    };
    console.log(jwtUserData);
    return jwt.sign(jwtUserData, Props.jwtSecret.key,{ expiresIn: 60 * 60 });
}*/

module.exports.basicAuth = (req, res,next) => {
    console.log("Basic authrization starts..");
    if (!(req.headers.authorization)){
        console.log("no header auth");
         next(new UnauthorizedAccessError("authorization header is empty"));
    }
    else{
        let token = exports.fetch(req.headers,next);
        if(!(token)){
            next(new UnauthorizedAccessError("Please Enter Proper Basic Authorization Token"));
        }
        else if(token[0] == 'Basic' && token[1])  {
            let credentials = auth(req);
            console.log(credentials.name)
            child.findOne({"childId": credentials.name}, function (err, result){
                if (!credentials || credentials.name != result.childId || credentials.pass != Props.basicAuth.passWord) {
                next(new UnauthorizedAccessError("Basic authorization is failed"));
                } else {
                    next(null, true);
                 }
             });
            
        }else{
            next(new UnauthorizedAccessError("authorization header is invalid"));
        }
    }

};