const Joi = require('joi')

module.exports = (schema, redirectTo) => async (ctx, next) => {
  const { error } = Joi.validate(ctx.request.body, schema)

  if (error) {
    const errors = error.details.map(error => error.message)

    ctx.flash('error', errors)
    ctx.redirect(redirectTo || ctx.request.url)
  } else {
    return next()
  }
}
