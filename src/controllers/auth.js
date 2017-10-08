const _ = require('lodash')
const passport = require('passport')
const User = require('../models/user')

async function login (ctx) {
  await ctx.render('auth/login', {
    title: 'Login',
    layout: 'empty',
    flash: ctx.flash()
  })
}

async function loginPost (ctx) {
  passport.authenticate('local', (err, user, info) => {
    console.log('dddd')
    if (err) {
      console.log(err)
      ctx.flash('error', { msg: 'fuck' })
      return ctx.redirect('/login')
    }

    if (!user) {
      ctx.flash('errors', info)
      return ctx.redirect('/login')
    }

    ctx.logIn(user, (err) => {
      if (err) {
        console.log(err)
        ctx.flash('error', { msg: 'fuck' })
        return ctx.redirect('/login')
      }

      ctx.flash('success', { msg: 'Success! You are logged in.' })
      return ctx.redirect('/')
    })
  })()
}

async function signup (ctx) {
  await ctx.render('auth/signup', {
    title: 'Signup',
    layout: 'empty',
    flash: ctx.flash()
  })
}

async function signupPost (ctx) {
  const payload = ctx.request.body
  const user = _.omit(payload, ['passwordConfirm', '_csrf'])

  try {
    const existingUser = await User.findOne({ db: ctx.db, user: { email: user.email } })

    if (existingUser) {
      ctx.flash('error', ['An account with that email already exists.'])
      ctx.redirect('signup')
    } else {
      const newUser = await User.save({ db: ctx.db, user })
      console.log('created ?')

      await ctx.login(newUser)
      ctx.redirect('/')
    }
  } catch (e) {
    console.log(e)
    ctx.flash('error', ['Something bad happened :('])
    ctx.redirect('signup')
  }
}

async function forgot (ctx) {
  await ctx.render('auth/forgot', {
    title: 'Forgot Password',
    layout: 'empty'
  })
}

async function reset (ctx) {
  await ctx.render('auth/reset', {
    title: 'Reset Password',
    layout: 'empty'
  })
}

module.exports = {
  login,
  loginPost,
  signup,
  signupPost,
  forgot,
  reset
}
