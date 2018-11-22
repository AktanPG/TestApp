const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
require('./db').connect();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/auth', require('./api/auth'));
app.use('/api/offers', require('./api/offers'));

app.listen(5000, function() { console.log('__[ Server started ]__') });