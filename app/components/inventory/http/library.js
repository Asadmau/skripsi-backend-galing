const { lib, file } = require('../../storage')
const uuid = require('uuid')
const fs = require('fs')
module.exports = class {
  static mediaUpload = (base64Data) => {
    let id = uuid.v4()
    let item = {
      base64: lib.stringBase64(base64Data),
      contentType: lib.getContentType(base64Data),
    }
    let buffer = Buffer.from(item.base64, 'base64')
    return new Promise((resolve, reject) => {
      file.create({ id, contentType: item.contentType }).then(
        (it) => {
          fs.writeFile('uploads/' + it.id, buffer, (err) => {
            if (err) {
              reject({
                status: false,
                error: err,
              })
            } else {
              resolve({
                status: true,
                id: it.id,
                contentType: it.contentType,
              })
            }
          })
        },
        (errors) => {
          reject({
            status: false,
            error: errors,
          })
        }
      )
    })
  }
}
