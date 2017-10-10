const { sendMail } = require('../helpers/mailer')

const {
  APP_NAME,
  CONTACT_EMAIL
} = process.env

async function index (ctx) {
  console.log(ctx.headers.host)
  await ctx.render('index')
}

async function about (ctx) {
  await ctx.render('static/about', {
    title: 'About'
  })
}

async function terms (ctx) {
  await ctx.render('static/terms', {
    title: 'Terms',
    fixedHeader: true
  })
}

async function contact (ctx) {
  await ctx.render('static/contact', {
    title: 'Contact',
    fixedHeader: true,
    flash: ctx.flash()
  })
}

async function contactPost (ctx) {
  const payload = ctx.request.body

  // No need to block rendering for sending an email..
  sendMail({
    to: CONTACT_EMAIL,
    from: payload.email,
    subject: `${APP_NAME}: New message from ${payload.name}`,
    text: payload.body
  }).catch(e => ctx.logError(e))

  ctx.flash('success', ['We got your message, we\'ll get back to you soon :)'])
  ctx.redirect('/contact')
}

async function testEmail (ctx) {
  let output = {}

  await ctx.render.call(output, 'emails/test', {
    title: 'Contact',
    preview: 'Small preview of the email',
    layout: 'email'
  })

  const html = output.body

  await sendMail({
    to: CONTACT_EMAIL,
    subject: 'test html body',
    html
  }).then(() => {
    return ctx.redirect('/')
  }).catch(e => console.log(e))
}

module.exports = {
  index,
  about,
  terms,
  contact,
  contactPost,
  testEmail
}
