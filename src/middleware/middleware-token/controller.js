require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const authcookie = process.env.AUTHCOOKIE;

exports.appendAsCookie = function(res, token, opts){
    let {custom} = opts || {custom:false};
    res.cookie(authcookie, token, {
        secure: true,
        httpOnly: true,
        sameSite:'strict',
    });
    if(custom){
        let name = custom.name;
        delete custom.name;
        res.cookie(name, token, custom);
    };
};

exports.createToken = function(credential){
    //sample token;
    return jwt.sign(credential,secret, { expiresIn: '8h' });
};

exports.getToken = function(cookies, name){
    name = name || authcookie;
    cookies = cookies.split(" ").join("");
    let split = cookies.split(';');
    let token = null;
    for (let s = 0; s < split.length; s++){
        let [p, _token] = split[s].split('=');
        if (name == p){
            token = _token;
            break;
        } else { 
            continue 
        };
    };
    return token;
};

exports.verifyToken = function(token){
    return new Promise((res, rej)=>{
        if (!token){
            throw new Error('no token');
        }
        jwt.verify(token, secret, function(err, user){ 
            if (err){ 
                throw new Error(err.message);
            } else {
                res(user);
            };
        });
    });
};