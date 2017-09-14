'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_FACTOR = 10; // Runs an algorithm 10 times to create a hash


//Users schema for our Social App
//Note that username has to be unique and is required as well as password
var userSchema = mongoose.Schema({
    username: {type: String, required:true, unique:true},
    password:{type: String, required:true},
    createdAt: {type: Date, default: Date.now()},
    displayName: String,
    bio: String
});

//Pre-Save action
//Runs the code before sending to the database so we can hash the password
//Cannot use => arrow function. It changes the scope of 'this'
var noop = function() {};

userSchema.pre('save', function(done) {
    var user = this;
    if(!user.isModified('password')) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err,salt) {
        if(err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if(err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

//Check the password is correct when user logs in
userSchema.methods.checkPassword = function(guess, done){
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err,isMatch);
  });
};

//Adding a method to get username or displayName
userSchema.methods.name = function() {
    return this.displayName || this.username;
};

var User = mongoose.model("User",userSchema);

//Export User
module.exports = User;