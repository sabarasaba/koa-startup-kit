const massive = require('massive')
const knex = require('knex')

const {
  DATABASE_API_HOST: apiHost,
  DATABASE_API_PORT: apiPort = 5432,
  DATABASE_API_USER: apiUser,
  DATABASE_API_PASSWORD: apiPassword,
  DATABASE_API_NAME: apiDatabase,
  DATABASE_URL: databaseUrl,
  NODE_ENV
} = process.env

const pgConnection = NODE_ENV === 'development'
  ? {
    host: apiHost,
    port: apiPort,
    database: apiDatabase,
    user: apiUser,
    password: apiPassword
  }
  : databaseUrl

const knexConfig = {
  client: 'pg',
  connection: pgConnection,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

module.exports = {
  database: massive(pgConnection),
  dbConnection: knexConfig,
  knex: knex(knexConfig)
}
