const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "518153544404-dfasll0ria6qpoivih46rht0emjeskgd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5005/google",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log('profile',profile)
        return done(null, profile);
    }
));