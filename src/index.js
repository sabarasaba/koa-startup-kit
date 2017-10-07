const chalk = require('chalk')
const app = require('./app')

// Run
app.listen(app.port)

process.stdout.write(chalk.blue(`[${app.env}] ${app.name}\n`))
process.stdout.write(`Running on http://localhost:${app.port}\n`)
