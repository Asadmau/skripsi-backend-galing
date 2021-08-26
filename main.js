const { express, port } = require('./app/state')
const httpComponent = require('./app/components')
const run = () => {
  httpComponent()
  express.app.listen(port, () => console.log('App runing in port ' + port))
}
run()
