const {
  APP_NAME,
  GA_CODE
} = process.env

function load (hbs) {
  hbs.registerHelper('if_eq', (a, b, opts) => {
    if (a === b) {
      return opts.fn(this)
    }

    return opts.inverse(this)
  })

  hbs.registerHelper('copyright_year', (opts) => {
    return new Date().getFullYear()
  })

  hbs.registerHelper('get_name', (opts) => {
    return APP_NAME
  })

  hbs.registerHelper('get_analytics', (opts) => {
    return GA_CODE
  })
}

module.exports = {
  load
}
