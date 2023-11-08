const { Router } = require('express')

const { DocenteController } = require('../controllers/DocenteController')
const { FotoController } = require('../controllers/FotoController')

const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated')
const { ensureIsAdmin } = require('../middlewares/ensureIsAdmin')

const docenteRoutes = Router()

const docenteController = new DocenteController()
const fotoController = new FotoController()

//rotas para consulta

docenteRoutes.get('/', docenteController.listAllDocentes)

docenteRoutes.get('/:id', docenteController.listDocenteById)

//rotas somente para admins

docenteRoutes.use(ensureAuthenticated, ensureIsAdmin)

docenteRoutes.post('/', docenteController.createDocente)

docenteRoutes.post('/temp', fotoController.store)

docenteRoutes.put('/:id', docenteController.updateDocente)

docenteRoutes.delete('/:id', docenteController.deleteDocente)

module.exports = { docenteRoutes }
