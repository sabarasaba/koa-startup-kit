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
    fixedHeader: true
  })
}

async function contactPost (ctx) {

}

module.exports = {
  index,
  about,
  terms,
  contact,
  contactPost
}
