const Joi = require('joi')

module.exports = schema => async (ctx, next) => {
  const {error} = Joi.validate(ctx.request.body, schema)

  if (error) {
    const errors = error.details.map(error => error.message)

    ctx.flash('error', errors)
    ctx.redirect(ctx.request.url)
  } else {
    return next()
  }
}
