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
// console.log(profile)
// console.log('profile id:', profile.id)
// console.log('this is:',profile.displayName)
// console.log('hey', res.local)
// db.query = (
//     `
//     WITH insert_cte AS (
//       INSERT INTO public.google (google_id, name)
//       VALUES ($1, $2)
//       ON CONFLICT (google_id) DO NOTHING
//       RETURNING google_id, name
//     )
//     SELECT google_id, name FROM insert_cte
//     UNION ALL
//     SELECT google_id, name FROM public.google
//     WHERE google_id = $1
//     LIMIT 1;
//    `
// )