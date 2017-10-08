const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const { comparePassword } = require('../helpers/utils')

module.exports = function (db) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ db, user: { id } })
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ db, user: { email } })

      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` })
      }

      const isMatch = await comparePassword(user.password, password)

      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { msg: 'Invalid email or password.' })
      }
    } catch (err) {
      console.log(err)
      return done(err)
    }
  }))
}
