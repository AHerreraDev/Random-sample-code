const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const index = require('./routes/index');

// Initialize App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// routes
app.use('/', index);

// Port listening
app.listen(port, () => {
    console.log("All good, listening on: " + port);
});



// Code by Alex Herrera
