const jwt = require('jsonwebtoken');
const fs = require('fs');

const unexpectedError = (res, error, type=true) => {
    console.log(error);

    res.status(500).json({
        [type ? 'signup' : 'login']: false,
        massage: 'Something went wrong. Please try again later'
    });

}

const createToken = (payload) => {

    const key = JSON.parse(fs.readFileSync('private.key')).jwt;

    const token = jwt.sign(payload, key);

    return token;

}

module.exports = { unexpectedError, createToken };