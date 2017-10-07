const app = require('./app')

// Run
app.listen(app.port)
process.stdout.write(`[${app.env}] ${app.name} running on http://localhost:${app.port}\n`)
