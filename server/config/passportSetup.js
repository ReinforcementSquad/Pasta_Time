const passport = require('passport');
const googleOAuth = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys');
const db = require('../models/dbmodel')

passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    // Users.findById(obj, done);
    done(null, obj);
  });

passport.use(
    new googleOAuth({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
    }, (accessToken, refreshToken, profile, done) => {
        db.findUserById(profile.id).then((id) => {
            if (id) {
              return done(null, profile);
            } else {
              db.createUser(profile.id)
                .then((id) => {
                  return done(null, profile);
                });
            }
        });
}));
