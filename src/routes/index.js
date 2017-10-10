const authPages = require('./auth')
const staticPages = require('./static')
const Router = require('koa-router')

// TODO: there's probably a better way to do handle this 404 route
const notFound = new Router()

notFound.all('*', async (ctx) => {
  await ctx.render('404', {
    layout: 'empty',
    title: '404',
    fixedHeader: true
  })
})

module.exports = {
  load: (app) => {
    app.use(staticPages.routes())
    app.use(authPages.routes())
    app.use(notFound.routes())
  }
}
