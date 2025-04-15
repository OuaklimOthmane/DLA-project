const jwt = require('jsonwebtoken')
const key = require('./key')
const createTokenWithEmail = (email) => {
  return jwt.sign({ email }, key)
}

module.exports = createTokenWithEmail
