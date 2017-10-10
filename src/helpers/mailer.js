const sgMail = require('@sendgrid/mail')

const {
  SENDGRID_API_KEY
} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = (data) => {
  return sgMail.send(data)
}

async function sendHtmlEmail (ctx, { template, subject, to, from, textEmail, ...others }) {
  let output = {}

  await ctx.render.call(output, template, others)

  return sendMail({
    to,
    from,
    subject,
    text: textEmail,
    html: output.body
  })
}

module.exports = {
  sendMail,
  sendHtmlEmail
}
