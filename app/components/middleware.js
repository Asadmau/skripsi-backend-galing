const { secretJwt, bcrypt } = require('../state')
const jwt = require('jsonwebtoken')

module.exports = class {
  static authentication(req, res, next) {
    if (req.headers.authorization == undefined) {
      res.status(500).send({
        status: 'fail',
        message: 'Unauthorization headers',
      })
    } else {
      jwt.verify(req.headers.authorization, secretJwt, (err, payload) => {
        if (err) {
          res.status(403).send({
            status: 'fail',
            message: 'Expired token',
          })
        } else {
          req.user = payload
          next()
        }
      })
    }
  }

  static createToken = (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretJwt, { expiresIn: '1h' }, (err, encoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(encoded)
        }
      })
    })
  }

  static verifyPassword = (plainPassword, hashPassword) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashPassword, (err, info) => {
        if (err) {
          reject(info)
        } else {
          resolve(info)
        }
      })
    })
  }

  static hashPassword = (plainText) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err)
        } else {
          bcrypt.hash(plainText, salt, (hashErr, encrypted) => {
            if (err) {
              reject(hashErr)
            } else {
              resolve(encrypted)
            }
          })
        }
      })
    })
  }
}
