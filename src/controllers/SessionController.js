const User = require('../model/User')

const { compare } = require('bcryptjs')

const authConfig = require('../config/auth')
const { sign } = require('jsonwebtoken')
const AppError = require('../utils/AppError')

class SessionController {
  async createSession(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      throw new AppError('Email e/ou senha incorreto!', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email e/ou senha incorreto!', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return res.json({ user, token })
  }
}

module.exports = { SessionController }
