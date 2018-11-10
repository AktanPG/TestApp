const express = require('express');

const app = express();
require('./db').connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/auth', require('./api/auth'));

app.listen(5000, function() { console.log('__[ Server started ]__') });