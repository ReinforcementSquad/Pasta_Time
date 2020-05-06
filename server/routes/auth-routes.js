const router = require('express').Router();
const passport = require('passport');

// Google Authentication 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Callback Redirect Route
 router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
     res.send('Login Success')
 });  

module.exports = router;