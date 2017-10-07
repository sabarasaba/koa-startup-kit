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
