const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exprhbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

//Route files
const index = require('./routes/index');

//App init
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//View Engines
app.engine('handlebars', exprhbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// //Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// //Express session
app.use(session ({
    secret: 'secret',
    saveUninitialized : true,
    resave: true
}));


//Init passport
app.use(passport.initialize());
app.use(passport.session());


// //Express flash messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// //Express Validator
//This module is right from the git documentation
app.use(expressValidator ({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.lenght){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Routes previously defined at the beginning of this code
app.use('/', index);

//Start Server
app.listen(3000, () => {
    console.log('Passport listening on port 3000');
});
