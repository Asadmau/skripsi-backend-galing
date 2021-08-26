const {
  express: { app },
} = require('../../../state')
const produk = require('./service/product.controller')
// admin produk

module.exports = (basePath) => {
  app.get(basePath + '/produkList', (req, res) => {
    return produk.displayProduk().then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
}
