const Joi = require('joi')
const Boom = require('boom')

module.exports = schema => async (ctx, next) => {
  let {error} = Joi.validate(ctx.request.body, schema)
  if (error) {
    throw Boom.badImplementation(
      'Invalid input',
      error
    )
  }
  return next()
}
