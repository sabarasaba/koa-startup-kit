const Router = require('koa-router')
const controller = require('../controllers/user')
const validator = require('../middlewares/schema-validator')
const userModel = require('../models/user')

const router = new Router()

router.get('/settings', controller.settings)
router.post('/settings/profile', controller.profilePost)
router.post('/settings/password', validator(userModel.loginSchema), controller.passwordPost)
router.post('/settings/delete', validator(userModel.loginSchema), controller.deletePost)

module.exports = router
