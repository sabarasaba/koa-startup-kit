const _ = require('lodash')
const User = require('../models/user')

async function settings (ctx) {
  await ctx.render('user/settings', {
    title: 'Settings',
    fixedHeader: true,
    flash: ctx.flash()
  })
}

async function profilePost (ctx) {
  const payload = _.omit(ctx.request.body, ['_csrf'])

  try {
    await User.update({
      db: ctx.db,
      id: ctx.state.user.id,
      user: payload
    })

    ctx.flash('success', ['Success! Settings have been updated.'])
    ctx.redirect('/settings')
  } catch (err) {
    // TODO: deal with errors of email duped key
    ctx.logError(err)
    ctx.flash('error', ['Couldn\'t update your settings. Please try again later.'])
    ctx.redirect('/settings')
  }
}

async function passwordPost (ctx) {
  const payload = ctx.request.body

  ctx.redirect('/settings', payload)
}

async function deletePost (ctx) {
  const payload = ctx.request.body

  ctx.redirect('/settings', payload)
}

module.exports = {
  settings,
  profilePost,
  passwordPost,
  deletePost
}
