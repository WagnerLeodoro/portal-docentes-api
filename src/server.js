require('express-async-errors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const AppError = require('./utils/AppError')

require('dotenv/config')
require('./database/sequelize')

const PORT = process.env.SERVER_PORT || 3333

const { routes } = require('./routes')

const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(routes)

app.use((err, req, res, next) => {
  console.error(err)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  } else {
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
