const apiSchema = process.env.DATABASE_SCHEMA

exports.up = function (knex, Promise) {
  return createSchema().then(createUsersTable)

  function createSchema () {
    return knex.schema.raw(`CREATE SCHEMA ${apiSchema}`)
  }

  function createUsersTable () {
    return knex.schema.withSchema(apiSchema)
      .createTable('user', function (table) {
        table.increments('id').unsigned().unique().primary()

        // User settings
        table.string('firstName', 50)
        table.string('lastName', 50)
        table.string('email', 250).notNullable()

        // Password related stuff
        table.string('password').notNullable()
        table.string('passwordResetToken')
        table.date('passwordResetExpires')

        // Utils
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
