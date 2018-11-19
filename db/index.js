const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://mplace:mplace123@ds125502.mlab.com:25502/kambgram', 
        {useNewUrlParser: true} ,
        () => {
        console.log('__[ Connected to database ]__');
    });
}

module.exports.connect = connect;