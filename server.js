const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Connect to mlab - mongodDB

require('./db').connect();

// Create middlewares

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true
}));

// Connect routes

app.use('/api/auth/signup', require('./api/auth/signup/index'));
app.use('/api/auth/login', require('./api/auth/login/index'));
app.use('/api/auth/', require('./api/auth/additionalRoute'));
app.use('/api/users', require('./api/users'));

app.listen(5000, function() { console.log('__[ Server started ]__') });