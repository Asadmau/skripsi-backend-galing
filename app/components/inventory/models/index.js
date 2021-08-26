const produk = require('./produk.model')
const variasi = require('./variasi.model')
const satuan = require('./satuan.model')
const kategori = require('./kategori.model')
produk.hasMany(variasi)
variasi.belongsTo(produk, {
  foreignKey: 'produkId',
})

kategori.hasMany(produk)
produk.belongsTo(kategori, {
  foreignKey: 'kategoriId',
})

satuan.hasMany(variasi)
variasi.belongsTo(satuan, {
  foreignKey: 'satuanId',
})
module.exports = {
  produk,
  variasi,
  satuan,
  kategori,
}
