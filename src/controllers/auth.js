async function login (ctx) {
  await ctx.render('login', {
  	layout: 'empty'
  })
}

async function signup (ctx) {
  await ctx.render('signup', {
  	layout: 'empty'
  })
}

module.exports = {
  login,
  signup
}
