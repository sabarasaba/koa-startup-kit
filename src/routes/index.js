const staticPages = require('./static')
const Router = require('koa-router')

const notFound = new Router()

notFound.all('*', ctx => {
  ctx.render('404', {
    layout: 'empty'
  })
})

module.exports = {
  load: (app) => {
    app.use(staticPages.routes())
    app.use(notFound.routes())
  }
}
