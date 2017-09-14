'use strict';

const express = require('express');
const passport = require('passport');
var User = require("./models/users");
var router = express.Router();

//Setting variables for templates
router.use((req,res,next)=>{
   res.locals.currentUser = req.user;
   res.locals.errors = req.flash("error");
   res.locals.infos = req.flash("info");
   next();
});

//Index route
router.get('/', (req,res,next)=>{
   User.find().sort({createdAt: "descending"}).exec((err,users)=>{
            if(err){
                return next(err);
            }
            res.render("index", {users:users});
       });
});

//Sign up route
router.get('/signup', (req,res)=>{
    res.render('signup');
});

//Register a new user to database
router.post('/signup', (req,res,next)=> {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash('error', 'Username already exists');
            return res.redirect('/signup');
        }
        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save(next);
    });
}, passport.authenticate('login', {
    successRedirect:'/',
    failureRedirect:"/signup",
    failureFlash:true
}));

//Pass the username into the view
router.get('/users/:username', (req,res,next)=>{
    User.findOne({username:req.params.username}, (err,user)=>{
        if (err){
            return next(err);
        }
        if (!user) {
            return next(404);
        }
        res.render('profile', {user:user});
    });
});

//Login
router.get('/login', (req,res)=>{
    res.render('login');
});

//Login Post Handler
router.post('/login', passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: true
}));

//Logout handler
router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

//Middleware to determine if user is authenticated
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect('/login');
    }
}

//Edit Route
//Pass isAuthenticated into the route
router.get('/edit', ensureAuthenticated, function(req,res){
    res.render('edit');
});

//Edit Post Handler
router.post('/edit', ensureAuthenticated, function(req,res,next){
   req.user.displayName = req.body.displayName;
   req.user.bio = req.body.bio;
   req.user.save(function(err){
       if (err) {
           next(err);
           return;
       }
       req.flash('info', "Profile updated");
       res.redirect('/edit');
   });
});



module.exports = router;