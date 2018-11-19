const jwt = require('jsonwebtoken');
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
    }
});

module.exports.multer = multer({storage});
