const { sendMail } = require('../helpers/mailer')

const {
  APP_NAME,
  CONTACT_EMAIL
} = process.env

async function index (ctx) {
  await ctx.render('index')
}

async function about (ctx) {
  await ctx.render('about')
}

async function terms (ctx) {
  await ctx.render('terms', {
    fixedHeader: true
  })
}

async function contact (ctx) {
  await ctx.render('contact', {
    fixedHeader: true,
    flash: ctx.flash()
  })
}

async function contactPost (ctx) {
  // No need to block rendering for sending an email..
  sendMail({
    to: CONTACT_EMAIL,
    from: ctx.body.email,
    subject: `${APP_NAME}: New message from ${ctx.body.name}`,
    content: ctx.body.body
  }).catch(e => console.log(e)) // TODO: Properly log it with winston..

  ctx.flash('success', ['We got your message, we\'ll get back to you soon :)'])
  ctx.redirect('/contact')
}

module.exports = {
  index,
  about,
  terms,
  contact,
  contactPost
}
