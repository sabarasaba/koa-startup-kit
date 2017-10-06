'use strict'

const app = require('./app')

// Run
app.listen(app.port)
process.stdout.write(`[${app.env}] ${app.name} listening on port ${app.port}\n`)
