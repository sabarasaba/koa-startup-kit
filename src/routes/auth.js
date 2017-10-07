const Router = require('koa-router')
const controller = require('../controllers/auth')

const router = new Router()

router.get('/login', controller.login)
router.get('/signup', controller.signup)
router.get('/forgot', controller.forgot)
router.get('/reset', controller.reset)

module.exports = router
