const User = require('../model/User')
const AppError = require('../utils/AppError')

async function ensureIsAdmin(req, res, next) {
  const user_id = req.user

  const user = await User.findOne({
    attributes: ['id', 'isAdmin'],
    where: { id: user_id.id },
  })

  if (!user.dataValues.isAdmin) {
    throw new AppError('User is not a administrator', 401)
  }
  return next()
}

module.exports = { ensureIsAdmin }
