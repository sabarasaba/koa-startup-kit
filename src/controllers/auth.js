async function login (ctx) {
  await ctx.render('auth/login', {
    title: 'Login',
    layout: 'empty'
  })
}

async function signup (ctx) {
  await ctx.render('auth/signup', {
    title: 'Signup',
    layout: 'empty'
  })
}

async function forgot (ctx) {
  await ctx.render('auth/forgot', {
    title: 'Forgot Password',
    layout: 'empty'
  })
}

async function reset (ctx) {
  await ctx.render('auth/reset', {
    title: 'Reset Password',
    layout: 'empty'
  })
}

module.exports = {
  login,
  signup,
  forgot,
  reset
}
