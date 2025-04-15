const fs = require('fs')

const key = fs.readFileSync('secret.key', 'utf8', function read(err) {
  if (err) {
    throw err
  }
})
module.exports = key
