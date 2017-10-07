const joi = require('joi')
const { generateHash } = require('../helpers/utils')

const {
  DATABASE_SCHEMA
} = process.env

const schema = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email()
})

async function save ({ db, user }) {
  const hash = await generateHash(user.password)

  return db[DATABASE_SCHEMA].users.save({
    ...user,
    password: hash
  })
}

async function update ({ db, userId, user }) {
  return db[DATABASE_SCHEMA].user.update({
    ...user,
    userId,
    updated_at: new Date()
  })
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
