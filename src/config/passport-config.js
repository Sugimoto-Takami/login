// src/config/passport-config.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const getUserByField = require('../data/userService');

function initialize(passport, getUserByField) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByField('email', email);
        if (user  == null) {
            return done(null, false, {message: 'No user with that email'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField : 'email'},
    authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserByField('id', id); 
            return done(null, user)
        } catch (error) {
            return done(error);
        }
    })
}

module.exports = initialize;