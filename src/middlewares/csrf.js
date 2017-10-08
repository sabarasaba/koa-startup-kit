async function csrfMiddleware (ctx, next) {
  if (!ctx.state) {
    ctx.state = {}
  }

  ctx.state.csrf = ctx.csrf

  await next()
}

module.exports = csrfMiddleware
