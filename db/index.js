const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://mplace:0777128261asdf@ds125502.mlab.com:25502/kambgram', 
        {useNewUrlParser: true} ,
        () => {
        console.log('__[ Connected to database ]__');
    });
}

module.exports.connect = connect;