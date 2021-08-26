const fs = require('fs')

module.exports = class {
  static getContentType = (base64) => {
    return base64.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0]
  }
  static stringBase64 = (base64) => {
    return base64.replace('data:', '').replace(/^.+,/, '')
  }
  static uploadFile = ({ id, file }) => {
    return new Promise((resolve, reject) => {
      fs.writeFile('uploads/' + id, file, (err) => {
        if (err) {
          reject({
            status: false,
            error: err,
          })
        } else {
          resolve({
            status: true,
            id,
          })
        }
      })
    })
  }

  static showFile = (id, callback) => {
    return fs.stat('uploads/' + id, (err, info) => {
      if (err == null) {
        var readStream = fs.createReadStream('uploads/' + id)
        callback(null, readStream)
      } else if (err.code === 'ENOENT') {
        callback(err.code, 'file not found')
      } else {
        callback(err.code, err)
      }
    })
  }
}
