const {
  express: { app },
} = require('../../../../state')
const { satuan } = require('../../models')
module.exports = (basePath) => {
  app.get(basePath + '/satuan/pagination', async (req, res) => {
    try {
      const { page = 1, perPage = 20 } = req.query
      let limit = Number(perPage)
      let currentPage = Number(page)
      let offset = perPage * (currentPage - 1)
      const { count, rows } = await satuan.findAndCountAll({
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
  app.get(basePath + '/satuan/readOne/:id', async (req, res) => {
    try {
      const data = await satuan.findOne({ where: { id: req.params.id } })
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
  app.post(basePath + '/satuan/create', async (req, res) => {
    try {
      const data = await satuan.create(req.body)
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
  app.post(basePath + '/satuan/update', async (req, res) => {
    try {
      let body = req.body
      let id = body.satuanId
      delete body.satuanId
      const data = await satuan.update(body, { where: { id } })
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
  app.post(basePath + '/satuan/deleteMany', async (req, res) => {
    try {
      const data = await satuan.destroy({ where: { id: req.body.satuanId } })
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
