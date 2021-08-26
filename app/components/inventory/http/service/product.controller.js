const { produk, variasi } = require('../../models')
const { mediaUpload } = require('../library')
module.exports = class {
  static displayProduk() {
    return new Promise((resolve, reject) => {
      produk
        .findAll({
          limit: 2,
          include: [{ model: variasi, limit: 1, order: [['id', 'ASC']] }],
          group: ['produk.id'],
          order: [['createdAt', 'DESC']],
        })
        .then(
          (item) => {
            resolve({
              status: 'ok',
              data: item,
            })
          },
          (error) => {
            reject({
              status: 'fail',
              error: new Error(error),
            })
          }
        )
    })
  }
  static findAll(query) {
    const { page = 1, perPage = 20 } = query
    let limit = Number(perPage)
    let currentPage = Number(page)
    let offset = perPage * (currentPage - 1)
    return new Promise((resolve, reject) => {
      produk
        .findAndCountAll({
          offset,
          limit,
          include: [{ model: variasi }],
          group: ['produk.id'],
        })
        .then(
          (item) => {
            const { rows, count } = item
            resolve({
              status: 'ok',
              allData: count.length,
              currentPage,
              totalPage: Math.ceil(count.length / perPage),
              data: rows,
            })
          },
          (error) => {
            reject({
              status: 'fail',
              error: error,
            })
          }
        )
    })
  }
  static findOne(id) {
    return new Promise((resolve, reject) => {
      produk
        .findOne({
          include: [{ model: variasi }],
          where: {
            id,
          },
        })
        .then(
          (item) => {
            resolve({
              status: 'ok',
              data: item,
            })
          },
          (error) => {
            reject({
              status: 'fail',
              error: error,
            })
          }
        )
    })
  }

  static addProduk(body) {
    return new Promise((resolve, reject) => {
      let stringImage = body.base64Data
      mediaUpload(stringImage).then(
        (media) => {
          if (media.status) {
            // remove object with destructuring for object base64Data
            const { base64Data, ...payload } = body
            produk.create({ ...payload, ...{ fileId: media.id } }).then(
              (isProduk) => {
                let dataVariasi = payload.variasi.map((item) => {
                  let variasiItem = item
                  variasiItem.produkId = isProduk.id
                  return variasiItem
                })
                variasi.bulkCreate(dataVariasi).then(
                  (isVariasi) => {
                    resolve({
                      status: 'ok',
                      data: isProduk,
                      variasi: isVariasi,
                    })
                  },
                  (err) => {
                    reject({
                      status: 'fail',
                      error: err,
                    })
                  }
                )
              },
              (err) => {
                reject({
                  status: 'fail',
                  error: err,
                })
              }
            )
          }
        },
        (err) => {
          reject({
            status: 'fail',
            message: 'failed create file',
            error: 'err',
          })
        }
      )
    })
  }
  static updateProduk(body) {
    return produk
      .update({ name: body.name }, { where: { id: body.produkId } })
      .then(() => {
        return Promise.all(
          body.variasi.map((it) => {
            let id = it.categoryId
            delete it.categoryId
            return variasi
              .update(it, { where: { id } })
              .then((idMatch) => idMatch)
          })
        )
      })
      .then(() => {
        return this.findOne(body.produkId)
      })
      .catch((err) => {
        return {
          status: 'fail',
          error: err,
        }
      })
  }

  static deleteOne(id) {
    return new Promise((resolve, reject) => {
      produk.destroy({ where: { id } }).then(
        (isDelete) => {
          variasi.destroy({ where: { produkId: id } }).then(
            () => {
              resolve({
                status: 'ok',
                message: isDelete + ' produk removed',
              })
            },
            (err) => {
              reject({
                status: 'fail',
                error: err,
              })
            }
          )
        },
        (err) => {
          reject({
            status: 'fail',
            error: err,
          })
        }
      )
    })
  }
  static deleteMany(manyId) {
    return new Promise((resolve, reject) => {
      produk.destroy({ where: { id: manyId } }).then(
        (isDelete) => {
          variasi.destroy({ where: { produkId: manyId } }).then(
            (isVariasiDelete) => {
              resolve({
                status: 'ok',
                message: isDelete + ' produk removed',
              })
            },
            (err) => {
              reject({
                status: 'fail',
                error: err,
              })
            }
          )
        },
        (err) => {
          reject({
            status: 'fail',
            error: err,
          })
        }
      )
    })
  }
}
