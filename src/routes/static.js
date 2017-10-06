const Router = require('koa-router')
const controller = require('../controllers/static')

const router = new Router()

router.get('/', controller.index)
router.get('/about', controller.about)
router.get('/terms', controller.terms)
router.get('/contact', controller.contact)

module.exports = router