const { Router } = require('express')

const { docenteRoutes } = require('./docentes.routes')
const { userRoutes } = require('./users.routes')
const { sessionRoutes } = require('./sessions.routes')

const routes = Router()

routes.use('/docentes', docenteRoutes)
routes.use('/users', userRoutes)
routes.use('/sessions', sessionRoutes)

module.exports = { routes }
