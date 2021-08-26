const { express } = require('../../state')
const uuid = require('uuid')
const fs = require('fs')
const lib = require('./library')
const file = require('./file.model')
module.exports = (basePath) => {
  // api for deployment service stoarge
  express.app.post(basePath + '/file/upload', (req, res) => {
    const id = uuid.v4()
    let item = {
      base64: lib.stringBase64(req.body.base64Data),
      contentType: lib.getContentType(req.body.base64Data),
    }
    let buffer = Buffer.from(item.base64, 'base64')
    try {
      fs.writeFile('uploads/' + id, buffer, (err) => {
        if (err) {
          res.status(403).send({
            status: 'fail',
            error: err,
          })
        } else {
          res.send({
            status: 'ok',
            message: 'success to upload',
            fileId: id,
            contentType: item.contentType,
          })
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  })
  express.app.get(basePath + '/file/:id', (req, res) => {
    file.findOne({ where: { id: req.params.id } }).then((it) => {
      if (it == null) {
        res.status(403).send('file not found')
      } else {
        fs.stat('uploads/' + it.id, (err, info) => {
          if (err == null) {
            var readStream = fs.createReadStream('uploads/' + it.id)
            res.contentType(it.contentType)
            readStream
              .on('data', (chunk) => {
                res.write(chunk)
              })
              .on('end', () => {
                res.end()
              })
          } else if (err.code === 'ENOENT') {
            res.status(403).send({
              status: 'fail',
              code: err.code,
              message: 'file not found',
            })
          } else {
            res.status(403).send({
              status: 'fail',
              error: err,
            })
          }
        })
      }
    })
  })
}
