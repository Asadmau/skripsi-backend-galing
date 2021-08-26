const { sequelize } = require('./app/state')
const initModel = require('./app/components/init')

const test = () => {
  initModel()
  sequelize.sync({ force: false, alter: true })
}

test()
