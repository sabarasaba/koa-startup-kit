const Router = require('koa-router')
const controller = require('../controllers/user')
const validator = require('../middlewares/schema-validator')
const userModel = require('../models/user')

const router = new Router()

router.get('/settings', controller.settings)
router.post('/settings/profile', validator(userModel.settingsSchema), controller.profilePost)
router.post('/settings/password', validator(userModel.resetSchema), controller.passwordPost)
router.post('/settings/delete', controller.deletePost)

module.exports = router
