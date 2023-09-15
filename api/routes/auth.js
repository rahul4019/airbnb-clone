const router = require('express').Router()
const passport = require('passport');
const cookieToken = require('../utils/cookieToken');

router.route('/login/success').get((req, res) => {
    if (req.user) {
        cookieToken(req.user, res)
    }
    else {
        res.status(400)
    }
})

router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:5173' }));

module.exports = router;