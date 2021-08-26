const {
  express: { app },
} = require('../../../state')
const produk = require('./service/product.controller')
const { authentication } = require('../../middleware')
// /admin/inventory => produk

module.exports = (basePath) => {
  app.get(basePath + '/produkAll/pagination', authentication, (req, res) => {
    return produk.findAll(req.query).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.get(basePath + '/produkOne/:id', authentication, (req, res) => {
    return produk.findOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produkCreate', authentication, (req, res) => {
    return produk.addProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produkUpdate', authentication, (req, res) => {
    return produk.updateProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.delete(basePath + '/produk/deleteOne/:id', authentication, (req, res) => {
    return produk.deleteOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produk/deleteMany', authentication, (req, res) => {
    return produk.deleteMany(req.body.manyId).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
}
