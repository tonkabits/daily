const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/User.model");
const findOrCreate = require('mongoose-findorcreate')
const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database

const Session = require("../models/Session.model");



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


router.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    })
)

passport.use(new GoogleStrategy({
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_GOOGLE_CLIENT_CALLBACK_URL,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log('profile',profile)
        User.findOne({ username: profile._json.email })
            .then(foundUser => {
                console.log('foundRes', foundUser)
                if(foundUser && foundUser != null){
                    console.log('we logged the found User')
                }else{
                    User.create({
                        username: profile._json.email,
                    })
                }
            })
            .catch()
        return done(null, profile);
    }
));