const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/user');

//Home Page
router.get('/', (req, res, next) => {
    res.render('index');
});

//Login form main page
router.get('/login', (req, res, next) =>{
    res.render('login');
});

//Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return done(null, false, {message: "No user found"});
        }
    User.comparePassword(password, user.password, (err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
            return done(null,user);
        } else {
            return done(null, false, {message: "Wrong Password"});
        }
    });

    })
}));


//Serialize and deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});


//Login <form> Process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


//Registration form main page
router.get('/register', (req, res, next) => {
    res.render('register');
});

//Register new Account <form> Process
router.post('/register', (req, res, next) =>{
    const name = req.body.Name;
    const username = req.body.Username;
    const email = req.body.Email;
    const password = req.body.Password;
    const password2 = req.body.PasswordConfirmation;


//All this has to pass in oder to have a successfull registration
    req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors(); // Or req.GetValidationResult();


//If there is an error after validating the form
//Re Render Register
//Pass errors
  if(errors){
    res.render('register', {
      errors: errors
    });
} else { //Register a new user.
      const newUser = new User({
          name: name,
          username: username,
          email: email,
          password: password
      });

      User.registerUser(newUser, (err, user) => {
          if(err) throw err;
          req.flash('success_msg', 'You are registered and can log in');
          res.redirect('/login');
      });
  }
});


module.exports = router;
