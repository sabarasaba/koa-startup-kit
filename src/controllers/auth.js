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

async function forgot (ctx) {
  await ctx.render('forgot', {
    layout: 'empty'
  })
}

async function reset (ctx) {
  await ctx.render('reset', {
    layout: 'empty'
  })
}

module.exports = {
  login,
  signup,
  forgot,
  reset
}
