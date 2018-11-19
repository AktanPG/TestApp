const express = require('express');
const session = require('express-session');

const app = express();
require('./db').connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'mplace-session',
    resave: false,
    saveUninitialized: true
}));

app.use('/api/auth', require('./api/auth'));
app.use('/api/offers', require('./api/offers'));

app.listen(5000, function() { console.log('__[ Server started ]__') });