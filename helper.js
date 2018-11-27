const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

module.exports.decodeJwt = function(token) {
    let res;
    
    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    jwt.verify(token, key, (err, payload) => {
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
