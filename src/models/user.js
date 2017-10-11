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

const forgotSchema = joi.object().keys({
  email: joi.string().email().required(),
  _csrf: joi.string()
})

const resetSchema = joi.object().keys({
  password: joi.string().min(3).max(15).required(),
  passwordConfirm: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'Passwords must be the same' } } }),
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

async function update ({ db, id, user }) {
  // If you wanna change the password, we need to hash it before storing it
  const hashedPassword = user.password
    ? { password: await generateHash(user.password) }
    : {}

  return db[DATABASE_SCHEMA].user.update({
    ...user,
    ...hashedPassword,
    id,
    updated_at: new Date()
  })
}

async function remove ({ db, id }) {
  return db.user.destroy(id)
}

module.exports = {
  loginSchema,
  signupSchema,
  forgotSchema,
  resetSchema,
  findOne,
  save,
  update,
  remove
}
