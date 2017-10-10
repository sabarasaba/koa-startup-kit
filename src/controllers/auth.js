const _ = require('lodash')
const hat = require('hat')
const passport = require('passport')
const moment = require('moment')
const { sendHtmlEmail } = require('../helpers/mailer')
const User = require('../models/user')

const {
  HTTPS,
  EMAIL_DOMAIN,
  APP_NAME
} = process.env

async function login (ctx) {
  await ctx.render('auth/login', {
    title: 'Login',
    layout: 'empty',
    flash: ctx.flash()
  })
}

async function loginPost (ctx, next) {
  await passport.authenticate('local', (err, user, info) => {
    try {
      if (err) {
        ctx.logError(err)
        return next(err)
      }

      if (!user) {
        ctx.flash('error', [info.msg])
        return ctx.redirect('/login')
      }

      ctx.logIn(user, (err) => {
        if (err) {
          ctx.logError(err)
          return next(err)
        }

        return ctx.redirect('/')
      })
    } catch (err) {
      ctx.logError(err)
      return ctx.redirect('/')
    }
  })(ctx, next)
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
      ctx.redirect('/signup')
    } else {
      const newUser = await User.save({ db: ctx.db, user })

      await ctx.login(newUser)
      ctx.redirect('/')
    }
  } catch (err) {
    ctx.logError(err)
    ctx.flash('error', ['Couldn\'t create your account, please try again later.'])
    ctx.redirect('/signup')
  }
}

async function forgot (ctx) {
  await ctx.render('auth/forgot', {
    title: 'Forgot Password',
    layout: 'empty',
    flash: ctx.flash()
  })
}

async function forgotPost (ctx) {
  const { db } = ctx
  const payload = ctx.request.body
  const token = hat()

  try {
    const user = await User.findOne({ db, user: { email: payload.email } })

    if (user) {
      await User.update({
        db,
        id: user.id,
        user: {
          passwordResetToken: token,
          passwordResetExpires: moment().add(1, 'hour').format()
        }
      })

      await sendHtmlEmail(
        ctx,
        {
          to: user.email,
          from: `no-reply@${EMAIL_DOMAIN}`,
          subject: `Reset your password on ${APP_NAME}`,
          template: 'emails/resetPassword',
          layout: 'email',
          preview: 'Seems like you forgot your password, click this link to change it',
          resetUrl: `${HTTPS ? 'https://' : 'http://'}${ctx.headers.host}/reset/${token}`,
          emailText: `Click this link to reset your password: http://localhost:3000/reset/${token}`
        }
      )

      ctx.flash('success', [`An e-mail has been sent to ${user.email} with further instructions.`])
      ctx.redirect('/forgot')
    } else {
      ctx.flash('error', ['Account with that email does not exist.'])
      ctx.redirect('/forgot')
    }
  } catch (err) {
    ctx.logError(err)
    ctx.flash('error', ['Couldn\'t reset your password, please try again later.'])
    ctx.redirect('/forgot')
  }
}

async function reset (ctx) {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/')
  }

  try {
    const user = await User.findOne({
      db: ctx.db,
      user: {
        'passwordResetExpires >': moment().format()
      }
    })

    if (!user) {
      ctx.flash('error', ['Password reset token is invalid or expired.'])
      return ctx.redirect('/forgot')
    }

    await ctx.render('auth/reset', {
      title: 'Reset Password',
      layout: 'empty',
      flash: ctx.flash()
    })
  } catch (err) {
    ctx.logError(err)
    ctx.flash('error', ['Couldn\'t validate your reset token, please try again later.'])
    ctx.redirect('/forgot')
  }
}

async function resetPost (ctx) {
  const payload = ctx.request.body

  try {
    const user = await User.findOne({
      db: ctx.db,
      user: {
        'passwordResetExpires >': moment().format()
      }
    })

    if (!user) {
      ctx.flash('error', ['Password reset token is invalid or expired.'])
      return ctx.redirect('/forgot')
    }

    await User.update({
      db: ctx.db,
      id: user.id,
      user: {
        password: payload.password,
        passwordResetExpires: null,
        passwordResetToken: null
      }
    })

    await sendHtmlEmail(
      ctx,
      {
        to: user.email,
        from: `no-reply@${EMAIL_DOMAIN}`,
        subject: `Your ${APP_NAME} password has been changed`,
        template: 'emails/resetPasswordSuccess',
        layout: 'email',
        preview: 'This is a confirmation that the password for your account has been changed',
        userEmail: user.email,
        emailText: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      }
    )

    ctx.flash('success', ['Success! Your password has been changed.'])
    ctx.redirect('/login')
  } catch (err) {
    ctx.logError(err)
    ctx.flash('error', ['Couldn\'t validate your reset token, please try again later.'])
    ctx.redirect('/forgot')
  }
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
  forgotPost,
  reset,
  resetPost,
  logout
}
