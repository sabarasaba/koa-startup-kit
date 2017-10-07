require('dotenv').config()
require('babel-polyfill')

const {
  APP_NAME,
  PORT,
  NODE_ENV,
  SESSION_SECRET
} = process.env

const Koa = require('koa')
const path = require('path')
const body = require('koa-bodyparser')
const hbs = require('koa-hbs')
const serve = require('koa-static')
const enforceHttps = require('koa-sslify')
const session = require('koa-generic-session')
const flash = require('koa-better-flash')
const appRoutes = require('./routes/index')
const handlebarsHelpers = require('./helpers/handlebars')
const { database } = require('./helpers/database')

const app = new Koa()

// Settings
app.name = APP_NAME
app.port = PORT
app.proxy = true

// Set database without middleware
database.then(db => {
  app.context.db = db
}).catch(e => console.log('Couldnt initialize db', e))

// Session
app.keys = [SESSION_SECRET]
app.use(session())

// Middlewares
app.use(flash())
app.use(body())

// Mount public directory
app.use(serve(path.join(__dirname, 'public')))

// Load handlebars helpers and initialize layouts/views/partials
handlebarsHelpers.load(hbs)

app.use(hbs.middleware({
  viewPath: `${__dirname}/views`,
  layoutsPath: `${__dirname}/views/layouts`,
  partialsPath: `${__dirname}/views/partials`,
  defaultLayout: 'main'
}))

// Force https in production
if (NODE_ENV === 'production') {
  app.use(enforceHttps({
    trustProtoHeader: true
  }))
}

appRoutes.load(app)

module.exports = app
