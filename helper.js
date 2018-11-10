const jwt = require('jsonwebtoken');

module.exports.decodeJwt = function(token) {
    let res;
    
    jwt.verify(token, require('./config.json').jwtKey, (err, payload) => {
        if(err) {
            console.log(err);
            return false
        }

        res = payload;
    });
    
    return res;
}