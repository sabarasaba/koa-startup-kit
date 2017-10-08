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
    try {
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
    } catch (err) {
      console.log(err)
      return ctx.redirect('/')
    }
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

      await ctx.login(newUser)
      ctx.redirect('/')
    }
  } catch (e) {
    console.log(e)
    ctx.flash('error', ['Couldn\'t create your account, please try again later.'])
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

async function logout (ctx) {
  ctx.logout()
  ctx.redirect('/')
}

module.exports = {
  login,
  loginPost,
  signup,
  signupPost,
  forgot,
  reset,
  logout
}
