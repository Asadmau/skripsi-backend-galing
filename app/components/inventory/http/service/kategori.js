const {
  express: { app },
} = require('../../../../state')
const { kategori } = require('../../models')
module.exports = (basePath) => {
  app.get(basePath + '/kategori/pagination', async (req, res) => {
    try {
      const { page = 1, perPage = 20 } = req.query
      let limit = Number(perPage)
      let currentPage = Number(page)
      let offset = perPage * (currentPage - 1)
      const { count, rows } = await kategori.findAndCountAll({
        offset,
        limit,
      })
      res.send({
        status: 'ok',
        allData: count,
        currentPage,
        totalPage: Math.ceil(count / perPage),
        data: rows,
      })
    } catch (error) {
      res.status(403).send({
        status: 'failed',
        error: error,
      })
    }
  })
  app.get(basePath + '/kategori/readOne/:id', async (req, res) => {
    try {
      const data = await kategori.findOne({ where: { id: req.params.id } })
      res.send({
        status: 'ok',
        data,
      })
    } catch (error) {
      res.status(403).send({
        status: 'failed',
        error: error,
      })
    }
  })
  app.post(basePath + '/kategori/create', async (req, res) => {
    try {
      const data = await kategori.create(req.body)
      res.send({
        status: 'ok',
        data,
      })
    } catch (error) {
      res.status(403).send({
        status: 'failed',
        error: error,
      })
    }
  })
  app.post(basePath + '/kategori/update', async (req, res) => {
    try {
      let body = req.body
      let id = body.kategoriId
      delete body.kategoriId
      const data = await kategori.update(body, { where: { id } })
      res.send({
        status: 'ok',
        message: data + ' rows updated',
      })
    } catch (error) {
      res.status(403).send({
        status: 'failed',
        error: error,
      })
    }
  })
  app.post(basePath + '/kategori/deleteMany', async (req, res) => {
    try {
      const data = await kategori.destroy({ where: { id: req.body.kategoriId } })
      res.send({
        status: 'ok',
        message: data + ' rows delete',
      })
    } catch (error) {
      res.status(403).send({
        status: 'failed',
        error: error,
      })
    }
  })
}
