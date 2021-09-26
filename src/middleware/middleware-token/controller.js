const jwt = require('jsonwebtoken');


exports.appendAsCookie = function(res, token, opts){
    let {secure, notSecure, custom} = opts;
    if (secure){
        res.cookie({
            
        })
    }
} 

exports.createToken = function(req){

}