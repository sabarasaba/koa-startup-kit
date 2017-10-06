const apiSchema = process.env.DATABASE_API_SCHEMA

exports.up = function (knex, Promise) {
  return knex.schema.withSchema(apiSchema)
    .alterTable('reminders', function (table) {
      table.renameColumn('email_content', 'email_body')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema(apiSchema)
    .alterTable('reminders', function (table) {
      table.renameColumn('email_body', 'email_content')
    })
}
