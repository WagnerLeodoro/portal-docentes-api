const User = require('../model/User')
const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserController {
  async createUser(req, res) {
    const { name, email, password } = req.body

    const emailExists = await User.findOne({ where: { email: email } })

    if (emailExists) return res.json('Email already registered')

    const passwordHash = await hash(password, 8)

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    })
    return res.status(201).json([newUser])
  }

  async listAllUsers(req, res) {
    const allUsers = await User.findAll({
      attributes: ['name', 'email'],
    })
    return res.status(200).json(allUsers)
  }

  async listUserById(req, res) {
    const { id } = req.params

    const user = await User.findByPk(id, {
      attributes: ['name', 'email'],
    })

    if (!user) {
      throw new AppError('Usuário não existe', 400)
    }
    return res.json(user)
  }
}

module.exports = { UserController }
