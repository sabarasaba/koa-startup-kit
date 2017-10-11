module.exports = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  }

  ctx.redirect('/')
}
