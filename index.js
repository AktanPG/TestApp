const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Connect to mlab - mongodDB

require('./db').connect();

// Create middlewares

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'SECRET', // key 
    resave: false,
    saveUninitialized: true
}));


app.use('/static/', express.static(path.join(__dirname, 'client/build/static')));

// Connect routes

app.use('/api/auth/signup', require('./api/auth/signup/index'));
app.use('/api/auth/login', require('./api/auth/login/index'));
app.use('/api/auth/', require('./api/auth/additionalRoute'));
app.use('/api/users', require('./api/users'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));

const port = process.env.PORT || 5000;

app.listen(port, function() { console.log(`__[ Server started on port ${port} ]__`) });