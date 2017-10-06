const helper = require('sendgrid').mail
const {
  SENDGRID_API_KEY: sendgridKey
} = process.env

const sg = require('sendgrid')(sendgridKey)

const sendMail = ({ subject, to, from, content }) => {
  return new Promise((resolve, reject) => {
    const mail = helper.Mail(
      new helper.Email(from),
      subject,
      new helper.Email(to),
      new helper.Content('text/html', content)
    )

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    })

    sg.API(request, (err, res) => {
      if (err) {
        reject(err)
      }

      resolve(res)
    })
  })
}

module.exports = {
  sendMail
}
