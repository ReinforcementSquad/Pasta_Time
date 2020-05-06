const passport = require('passport');
const googleOAuth = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./keys')
const db = require("../models/dbmodel.js");

// passport.serializeUser((placeholder, done) => {
//     done(null, user_placeholder)
// });

// passport.deserializeUser((id_placeholder, done) => {

// });

passport.use(
    new googleOAuth({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
        })
        //postgres logic here
        //if condition check to see if user exist or not
        console.log(profile)
        console.log('profile id:', profile.id)
        console.log('this is:',profile.displayName)
        db.query = (
            `
            WITH insert_cte AS (
              INSERT INTO public.google (google_id, name)
              VALUES ($1, $2)
              ON CONFLICT (google_id, name) DO NOTHING
              RETURNING google_id, name
            )
            SELECT google_id, name FROM insert_cte
            UNION ALL
            SELECT google_id, name FROM public.google
            WHERE google_id = $1
            LIMIT 1;
            `
        )
        //else condition create new user
     }),
); 
