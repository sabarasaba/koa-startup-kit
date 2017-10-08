const joi = require('joi')
const { generateHash } = require('../helpers/utils')

const {
  DATABASE_SCHEMA
} = process.env

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
  _csrf: joi.string()
})

const signupSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(3).max(15).required(),
  passwordConfirm: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'Passwords must be the same' } } }),
  _csrf: joi.string()
})

async function findOne ({ db, user }) {
  return db[DATABASE_SCHEMA].user.findOne(user)
}

async function save ({ db, user }) {
  const hash = await generateHash(user.password)

  return db[DATABASE_SCHEMA].user.save({
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
  loginSchema,
  signupSchema,
  findOne,
  save,
  update,
  remove
}
