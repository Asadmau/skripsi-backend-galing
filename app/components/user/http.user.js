const {
  express: { app },
} = require('../../state')
const { hashPassword, verifyPassword, createToken } = require('../middleware')
const user = require('./user.model')
module.exports = (basePath) => {
  app.post(basePath + '/login', (req, res) => {
    user
      .findOne({ where: { email: req.body.email } })
      .then((it) => {
        if (it == null) {
          return Promise.reject('email not registered')
        } else {
          return verifyPassword(req.body.password, it.password).then(
            (match) => {
              return {
                payload: it,
                isMatch: match,
              }
            }
          )
        }
      })
      .then(({ isMatch, payload }) => {
        if (isMatch) {
          return createToken({
            email: payload.email,
            firstName: payload.firstName,
            userId: payload.id,
          })
        }
        return Promise.reject('incorrect password')
      })
      .then((accessToken) => {
        res.send({
          status: 'ok',
          accessToken,
        })
      })
      .catch((err) => {
        res.status(403).send({
          status: 'fail',
          error: err,
        })
      })
  })
  app.post(basePath + '/register', (req, res) => {
    user
      .findOne({ where: { email: req.body.email } })
      .then((it) => {
        if (it != null) {
          res.status(403).send({
            status: 'fail',
            message: 'email already exist',
          })
        }
        return hashPassword(req.body.password)
      })
      .then((encrypted) => {
        const { password, ...payload } = req.body
        return user.create({ ...payload, ...{ password: encrypted } })
      })
      .then((isUser) => {
        res.send({
          status: 'ok',
          data: isUser,
        })
      })
      .catch((err) => {
        res.status(403).send({
          status: 'fail',
          error: err,
        })
      })
  })
}
