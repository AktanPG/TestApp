const jwt = require('jsonwebtoken');
const fs = require('fs');

const unexpectedError = (res, error, type=true) => {
    //Simple function to create response. Just i am lazy )
    res.status(500).json({
        [type ? 'signup' : 'login']: false,
        massage: 'Something went wrong. Please try again later'
    });

}

const createToken = (payload) => {

    //Get secret key
    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    //Sign token
    const token = jwt.sign(payload, key);

    //return it
    return token;

}

module.exports = { unexpectedError, createToken };