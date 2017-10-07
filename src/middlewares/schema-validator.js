const Joi = require('joi')
const Boom = require('boom')

module.exports = schema => async (ctx, next) => {
  const {error} = Joi.validate(ctx.request.body, schema)

  if (error) {
    // TODO: flash error message ?
    throw Boom.badImplementation(
      'Invalid input',
      error
    )
  }

  return next()
}
