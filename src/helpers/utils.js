const bcrypt = require('bcrypt-nodejs')

function generateHash (password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      }

      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) {
          reject(err)
        }

        resolve(hash)
      })
    })
  })
}

// B argument from signup form, a current users password
function comparePassword (a, b) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(b, a, (err, isMatch) => {
      if (err) {
        reject(err)
      }

      resolve(isMatch)
    })
  })
}

module.exports = {
  generateHash,
  comparePassword
}
