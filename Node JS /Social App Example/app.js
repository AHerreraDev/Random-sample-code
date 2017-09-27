'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const port = process.env.PORT || 3000;

//Initialize Passport
var setUpPassport = require('./setuppassport');

//Routes path file
var routes = require('./routes');

//Initialize app
var app = express();



//Connection to Mongo DB
mongoose.connect("mongodb://username:password@ds135624.mlab.com:35624/acctodo", {useMongoClient:true});
setUpPassport();

//View engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//App use: bodyParser, CookieParser, Session, flash and routes
//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(routes);

//Port listening
app.listen(port, ()=> {
    console.log("Server started on port " + port);
});
