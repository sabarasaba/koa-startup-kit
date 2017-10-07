const joi = require('joi')

const {
  DATABASE_API_SCHEMA
} = process.env

const schema = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email()
})

async function save ({ db, user }) {
  return db[DATABASE_API_SCHEMA].users.save(user)
}

async function update ({ db, userId, user }) {
  return db[DATABASE_API_SCHEMA].user.update(Object.assign(
    {},
    user,
    { userId, updated_at: new Date() }
  ))
}

async function remove ({ db, id, user }) {
  return db.user.destroy({ id, user })
}

module.exports = {
  schema,
  save,
  update,
  remove
}
