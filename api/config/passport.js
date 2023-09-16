const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
const bcrypt = require('bcryptjs');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // check if user already exists in the DB
                const user = await User.findOne({ email: profile._json.email })
                if (user) {
                    return done(null, user)
                } else {
                    // If the user does not exist, create a new user in the DB
                    const user = await User.create({
                        name: profile.displayName,
                        email: profile._json.email,
                        password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10)
                    })
                    return done(null, user)
                }
            } catch (error) {
                console.log(error)
            }
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})