const Router = require('koa-router')
const controller = require('../controllers/auth')
const validator = require('../middlewares/schema-validator')
const userModel = require('../models/user')

const router = new Router()

router.get('/login', controller.login)
router.post('/login', validator(userModel.loginSchema), controller.loginPost)
router.get('/signup', controller.signup)
router.post('/signup', validator(userModel.signupSchema), controller.signupPost)
router.get('/forgot', controller.forgot)
router.post('/forgot', validator(userModel.forgotSchema), controller.forgotPost)
router.get('/reset', controller.reset)
router.get('/logout', controller.logout)

module.exports = router
