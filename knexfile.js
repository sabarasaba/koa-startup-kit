require('dotenv').config()

const { dbConnection } = require('./src/helpers/database')

module.exports = dbConnection
