const { knex } = require('../src/helpers/database')

const setupDatabase = () => {
  knex.migrate.latest().then(() => knex.seed.run())
}

module.exports = {
  setupDatabase
}
