const joi = require('joi')
const { isUndefined, omit, has, toInteger } = require('lodash')
const { planAllowance, getSMSUsage, getEmailUsage } = require('../helpers/plans')

const schema = joi.object().keys({
  force: joi.boolean(),
  due: joi.string().required(),
  timezone: joi.string(),
  webhook: joi.string().uri(),
  email_to: joi.string().email(),
  email_body: joi.string(),
  email_subject: joi.string(),
  email_from: joi.string(),
  sms_to: joi.string(),
  sms_body: joi.string()
})

const containsAny = (source, compare) => {
  return source.some(v => compare.includes(v))
}

const arrayContainsArray = (source, compare) => {
  return compare.every(v => { return source.indexOf(v) >= 0 })
}

const schemaUpdate = joi.object().keys({
  force: joi.boolean(),
  due: joi.string(),
  timezone: joi.string(),
  webhook: joi.string().uri(),
  email_to: joi.string().email(),
  email_body: joi.string(),
  email_subject: joi.string(),
  email_from: joi.string(),
  sms_to: joi.string(),
  sms_body: joi.string()
})

const schemaGet = joi.object().keys({
  offset: joi.number().integer().min(0),
  limit: joi.number().integer().min(0),
  sort: joi.string(),
  active: joi.boolean()
})

function checkReminderNameAvaiableToModify (reminder) {
  if (!reminder) {
    throw new Error('Reminder id doesn\'t exists.')
  }
}

async function checkAllowedByPlan ({ db, user, body }) {
  const { id, plan } = user

  const allowance = planAllowance(plan)

  const emailsCount = await getEmailUsage(db, id)
  const smsCount = await getSMSUsage(db, id)

  const canAddSMS = toInteger(smsCount) < allowance.sms
  const canAddEmail = toInteger(emailsCount) < allowance.emails
  const canWebhook = allowance.webhook

  if (canAddSMS && canAddEmail && canWebhook) {
    return {
      body
    }
  } else {
    let res = {body, warnings: []}

    if (has(res.body, 'email_to') && !canAddEmail) {
      res.warnings.push('You\'ve exceeded your monthly allowance for Emails. Other specified notifications will be delivered anyway.')
      res.body = omit(res.body, [ 'email_to', 'email_from', 'email_subject', 'email_body' ])
    }

    if (has(res.body, 'sms_to') && !canAddSMS) {
      res.warnings.push(plan === 'free'
        ? 'Your plan does not support SMS.'
        : 'You\'ve exceeded your monthly allowance for SMS. Other specified notifications will be delivered anyway.'
      )
      res.body = omit(res.body, [ 'sms_to', 'sms_body' ])
    }

    if (has(res.body, 'webhook') && !canWebhook) {
      res.warnings.push(plan === 'free'
        ? 'Your plan does not support webhooks.'
        : 'You\'r plan does not support webhooks. Other specified notifications will be delivered anyway.'
      )
      res.body = omit(res.body, [ 'webhook' ])
    }

    if (plan === 'free' && res.warnings.length >= 1) {
      throw new Error(res.warnings.join(', '))
    }

    return res
  }
}

function validateSaveParams (body) {
  const emailKeys = ['email_to', 'email_from', 'email_subject', 'email_body']
  const smsKeys = ['sms_to', 'sms_body']
  const webhookKeys = ['webhook']
  const bodyKeys = Object.keys(body)

  if (containsAny(bodyKeys, smsKeys)) {
    if (!arrayContainsArray(bodyKeys, smsKeys)) {
      throw new Error('You must provide all paramenters for sending sms.')
    }
  }

  if (containsAny(bodyKeys, emailKeys)) {
    if (!arrayContainsArray(bodyKeys, emailKeys)) {
      throw new Error('You must provide all paramenters for sending emails.')
    }
  }

  if (!containsAny(bodyKeys, smsKeys) && !containsAny(bodyKeys, emailKeys) && !containsAny(bodyKeys, webhookKeys)) {
    throw new Error('At least one notification type must be defined')
  }
}

function list ({ db, user, active, offset, limit, sort }) {
  const payload = isUndefined(active) ? { user } : { user, active }

  return db.reminders.reminders.find(payload, { offset, limit, sort })
}

function listActive ({ db }) {
  return db.reminders.reminders.find({ active: true })
}

function listOne ({ db, id, user }) {
  const payload = user ? { id, user } : { id }

  return db.reminders.reminders.findOne(payload)
}

async function save ({ db, socketIO, body, user }) {
  const payload = await checkAllowedByPlan({ db, user, body })

  validateSaveParams(body)

  const reminder = await db.reminders.reminders.save(payload.body)

  if (socketIO) {
    socketIO.emit('reminder', reminder)
  } else {
    console.log('Socket instance not found.')
  }

  return payload.warnings ? { status: 'ok', warnings: payload.warnings } : { status: 'ok' }
}

async function update ({ db, socketIO, id, body, noSocketEvent = null }) {
  let reminder = await db.reminders.reminders.findOne({ id })

  checkReminderNameAvaiableToModify(reminder)

  const updatedReminder = await db.reminders.reminders.update(Object.assign(
    {},
    body,
    { id, updated_at: new Date() }
  ))

  if (noSocketEvent || socketIO) {
    if (!noSocketEvent) {
      socketIO.emit('reminder', updatedReminder)
    }
  } else {
    console.log('Socket instance not found.')
  }

  return { status: 'ok' }
}

async function remove ({ db, id, user }) {
  let reminder = await db.reminders.reminders.findOne({ id, user })

  checkReminderNameAvaiableToModify(reminder)

  await db.reminders.reminders.destroy({ id, user })

  return { status: 'ok' }
}

module.exports = {
  schema,
  schemaUpdate,
  schemaGet,
  list,
  listActive,
  listOne,
  save,
  update,
  remove
}
