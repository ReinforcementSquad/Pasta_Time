const passport = require('passport');
const googleOAuth = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys')


passport.use(
    new googleOAuth({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {

     }),
); 