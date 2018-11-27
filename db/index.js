const mongoose = require('mongoose');
const fs = require('fs');

function connect() {

    const key = JSON.parse(fs.readFileSync('private.key')).mlab;

    mongoose.connect(key, {useNewUrlParser: true},
        () => {
        console.log('__[ Connected to database ]__');
    });
    
}

module.exports.connect = connect;