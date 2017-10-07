const apiSchema = process.env.DATABASE_API_SCHEMA

exports.up = function (knex, Promise) {
  return createSchema().then(createRemindersTable)

  function createSchema () {
    return knex.schema.raw(`CREATE SCHEMA ${apiSchema}`)
  }

  function createRemindersTable () {
    return knex.schema.withSchema(apiSchema)
      .createTable('user', function (table) {
        table.increments('id').unsigned().unique().primary()
        table.string('firstName', 50).notNullable()
        table.string('lastName', 50).notNullable()
        table.string('email', 250).notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        // Index
        table.index('id')
      })
  }
}

exports.down = function (knex, Promise) {
  return dropRemindersTable()
    .then(dropSchema)

  function dropRemindersTable () {
    return knex.dropTableIfExists('user')
  }

  function dropSchema () {
    return knex.schema.raw(`DROP SCHEMA IF EXISTS ${apiSchema}`)
  }
}
