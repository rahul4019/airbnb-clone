const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
const bcrypt = require('bcryptjs');

passport.use(
    new GoogleStrategy({
        clientID: "734556199801-buoboraltt9qjnu37i6e5inbvg6gep6c.apps.googleusercontent.com",
        clientSecret: "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",
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