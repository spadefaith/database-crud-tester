const controller = require('./controller');

exports.create = function(req, res, next){
    const token = controller.createToken();
    controller.appendAsCookie(token,{
        secure:'MyToken',
        notSecure:'MyToken',
        custom:{
            name:'MyToken',
            secure:false,
        }
    });
    next();
}