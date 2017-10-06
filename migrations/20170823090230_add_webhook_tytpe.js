const apiSchema = process.env.DATABASE_API_SCHEMA

exports.up = function (knex, Promise) {
  return knex.schema.withSchema(apiSchema)
    .alterTable('reminders', function (table) {
      table.string('webhook', 300)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.withSchema(apiSchema)
    .alterTable('reminders', function (table) {
      table.dropColumn('webhook')
    })
}
