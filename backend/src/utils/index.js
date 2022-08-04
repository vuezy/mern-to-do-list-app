const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const PRIV_KEY = fs.readFileSync(path.join(__dirname, '../../keypair/rsa_priv_key.pem'), 'utf8')

module.exports = {
  getFormattedDate(date, includeTime=false) {
    let day = date.getDate()
    if (day < 10) day = '0' + day

    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month
    
    const year = date.getFullYear()

    let result = `${year}-${month}-${day}`
    if (includeTime) {
      let hour = date.getHours()
      if (hour < 10) hour = '0' + hour

      let minute = date.getMinutes()
      if (minute < 10) minute = '0' + minute

      result = `${result} ${hour}:${minute}`
    }

    return result
  },

  jwtSign(user) {
    const payload = {
      sub: user._id,
      username: user.username,
      iat: Date.now()
    }

    const token = jwt.sign(payload, PRIV_KEY, {
      algorithm: 'RS256',
      expiresIn: '7d'
    })
    return token
  }
}