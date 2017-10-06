const Router = require('koa-router')
const controller = require('../controllers/static')

const router = new Router()

router.get('/', controller.index)

module.exports = router
