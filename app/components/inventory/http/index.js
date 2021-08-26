module.exports = {
  admin: function (basePath) {
    require('./produk.http')(basePath)
    require('./service/satuan')(basePath)
    require('./service/kategori')(basePath)
  },
  public: require('./frontend'),
}
