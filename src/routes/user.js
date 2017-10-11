const Router = require('koa-router')
const controller = require('../controllers/user')
const validator = require('../middlewares/schema-validator')
const isAuthenticated = require('../middlewares/is-authenticated')
const userModel = require('../models/user')

const router = new Router()

router.get('/settings', isAuthenticated, controller.settings)
router.post('/settings/profile', isAuthenticated, validator(userModel.settingsSchema, '/settings'), controller.profilePost)
router.post('/settings/password', isAuthenticated, validator(userModel.resetSchema, '/settings'), controller.passwordPost)
router.post('/settings/delete', isAuthenticated, controller.deletePost)

module.exports = router
