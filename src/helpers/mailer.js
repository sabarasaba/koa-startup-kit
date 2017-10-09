const sgMail = require('@sendgrid/mail')

const {
  SENDGRID_API_KEY
} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = (data) => {
  return sgMail.send(data)
}

module.exports = {
  sendMail
}
