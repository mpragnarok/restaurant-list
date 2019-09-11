const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = require('../src/models/user')

module.exports = passport => {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
          return done(null, user)
        } else {
          return done(user.errors, null, { message: 'Email or password incorrect' })
        }
      } catch (e) {
        throw e
      }
    })
  )
  // passport serializeUser & deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}