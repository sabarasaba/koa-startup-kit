const apiSchema = process.env.DATABASE_API_SCHEMA

exports.up = function (knex, Promise) {
  return createSchema().then(createRemindersTable)

  function createSchema () {
    return knex.schema.raw(`CREATE SCHEMA ${apiSchema}`)
  }

  function createRemindersTable () {
    return knex.schema.withSchema(apiSchema)
      .createTable('reminders', function (table) {
        table.increments('id').unsigned().unique().primary()
        table.string('user', 50).notNullable()
        table.string('due').notNullable()
        table.string('timezone', 150).notNullable()
        table.boolean('active').defaultTo(true)

        table.string('email_to', 250)
        table.text('email_content')
        table.string('email_subject', 1000)
        table.string('email_from', 1000)

        table.string('sms_to', 1000)
        table.string('sms_body', 1000)

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        // Index
        table.index('id')
        table.index('active')
        table.index('user')
      })
  }
}

exports.down = function (knex, Promise) {
  return dropRemindersTable()
    .then(dropSchema)

  function dropRemindersTable () {
    return knex.dropTableIfExists('reminders')
  }

  function dropSchema () {
    return knex.schema.raw(`DROP SCHEMA IF EXISTS ${apiSchema}`)
  }
}
