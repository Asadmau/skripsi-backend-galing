const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const app = express()

app.use(express.static('/uploads'))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(compression())
module.exports = { app }
