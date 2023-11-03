const { Router } = require('express')
const { UserController } = require('../controllers/UserController')
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated')

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/', userController.createUser)

userRoutes.get('/', ensureAuthenticated, userController.listAllUsers)

userRoutes.get('/:id', ensureAuthenticated, userController.listUserById)

module.exports = { userRoutes }
