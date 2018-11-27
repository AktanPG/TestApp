const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

// function to decode jwt and get payload from it
module.exports.decodeJwt = function(token) {
    let res;
    
    // parse
    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    //verify
    jwt.verify(token, key, (err, payload) => {
        if(err) {
            console.log(err);
            return false
        }

        res = payload;
    });

    // return payload
    return res;
}

// multer config
const storage = multer.diskStorage({
    //dest
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname);
    }
});

module.exports.multer = multer({storage});
