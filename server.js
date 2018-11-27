const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
require('./db').connect();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true
}));

app.use('/api/auth/signup', require('./api/auth/signup/index'));
app.use('/api/auth/login', require('./api/auth/login/index'));
app.use('/api/users', require('./api/users'));

app.listen(5000, function() { console.log('__[ Server started ]__') });