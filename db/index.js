const mongoose = require('mongoose');
const fs = require('fs');

// function for connect to mlab
function connect() {

    // get key
    const key = JSON.parse(fs.readFileSync('private.key')).mlab;


    //connecting
    mongoose.connect(key, {useNewUrlParser: true},
        () => {
        console.log('__[ Connected to database ]__');
    });
    
}

module.exports.connect = connect;