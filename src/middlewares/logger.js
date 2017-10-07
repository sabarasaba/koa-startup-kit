const { hostname } = require('os')
const winston = require('winston')
const { logger } = require('koa2-winston')
require('winston-papertrail')

const {
  NODE_ENV: env,
  APP_NAME: appName,
  PAPERTRAIL_HOST: host,
  PAPERTRAIL_PORT: port
} = process.env

const baseOptions = {
  transports: [
    new winston.transports.Console({ json: true, stringify: true })
  ],
  level: 'debug'
}

const options = env === 'production' ? {
  ...baseOptions,
  transports: [
    ...baseOptions.transports,
    new winston.transports.Papertrail({
      host,
      port,
      hostname: `${env}-${hostname()}`,
      program: appName
    })
  ]
} : baseOptions

module.exports = () => {
  const loggerMiddleware = logger(options)
  return async (ctx, next) => {
    ctx.logError = logErrorFactory()
    try {
      return loggerMiddleware(ctx, next)
    } catch (ex) {
      ctx.logError(ex)
    }
  }
}

function logErrorFactory () {
  const logger = new winston.Logger(options)
  return function logError (error) {
    // Log in console
    logger.error(error)
  }
}
