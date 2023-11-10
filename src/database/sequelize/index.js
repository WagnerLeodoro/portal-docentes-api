const dotenv = require('dotenv')
dotenv.config()

const { Sequelize } = require('sequelize')
const dataBaseConfig = require('../../config/database')

const Docente = require('../../model/Docente')
const Foto = require('../../model/Foto')
const User = require('../../model/User')

const models = [Docente, Foto, User]

const dbConnection =
  NODE_ENV === 'development'
    ? new Sequelize(
        dataBaseConfig.database,
        dataBaseConfig.username,
        dataBaseConfig.password,
        {
          ...dataBaseConfig,
          host: process.env.DATABASE_HOST,
        },
      )
    : new Sequelize(process.env.DATABASE_URL)

models.forEach((model) => model.init(dbConnection))
models.forEach(
  (model) => model.associate && model.associate(dbConnection.models),
)
