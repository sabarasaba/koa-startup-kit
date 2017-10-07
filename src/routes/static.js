const Router = require('koa-router')
const controller = require('../controllers/static')
const validator = require('../middlewares/schema-validator')
const contactModel = require('../models/contact')

const router = new Router()

router.get('/', controller.index)
router.get('/about', controller.about)
router.get('/terms', controller.terms)
router.get('/contact', controller.contact)
router.post('/contact', validator(contactModel.schema), controller.contactPost)

module.exports = router
