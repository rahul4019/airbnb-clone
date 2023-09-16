const router = require('express').Router()
const passport = require('passport');
const cookieToken = require('../utils/cookieToken');

router.route('/login/success').get((req, res) => {
    if (req.user) {
        cookieToken(req.user, res)
    }
    else {
        res.status(400).json({ message: 'user not found' })
    }
})

router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { successRedirect: 'https://airbnb-1.netlify.app', failureRedirect: 'https://airbnb-1.netlify.app' }), (req, res) => {
    console.log('User: ', req.user)
    cookieToken(req.user, res)
});


module.exports = router;