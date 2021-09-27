const o = {};

function _parsePath(path, orig, callback){
    if (path == '.'){
        
    } else {
        path = path.split('.');
        path.forEach(item=>{
            if (orig[item]){
                orig = orig[item];
            };
        });
    };
    return callback(orig);
};

exports.set = function(key, val){ 
    val.__id = String(new Date().getTime());
    o[key] = val;
};

exports.remove = function(key){
    if (o[key]){
        delete o[key]
    };
};

exports.update = function(key, path, update){
    let config = o[key];
    if (config){
        config = _parsePath(path, config, function(obj){
            return Object.assign(obj, update);
        });
        
    };
};

exports.get = function(key, path){
    let config = o[key];
    if (config){
        config = _parsePath(path, config, function(obj){
            return obj;
        });
    };
    return config;
};