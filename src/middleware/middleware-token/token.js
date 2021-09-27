require('dotenv').config();
const controller = require('./controller');

function _getToken(req){
    const cookies = req.cookies;
    const token = controller.getToken(cookies);
    return token;
};

exports.create = function(req, res, next){
    const credential = req.locals.loginCredential
    const token = controller.createToken(credential);
    controller.appendAsCookie(res, token,{ 
        custom:{
            name:'MyToken',
            secure:false,
        }
    });
    next();
};

exports.get = function(req, res, next){
    const token = _getToken(req);
    req.locals.Token = token;
    next();
};

exports.verify = function(req, res, next){
    const token = _getToken(req);
    controller.verifyToken(token).then(user=>{
        req.locals.User = user;
        next();
    }).catch(err=>{
        next(err);
    });
};

exports.reset = function(req, res, next){
    const token = controller.createToken(process.env.RESETTOKEN);
    controller.appendAsCookie(res, token);
    next();
};