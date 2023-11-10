const dotenv = require('dotenv')
dotenv.config()

const { Sequelize } = require('sequelize')
const dataBaseConfig = require('../../config/database')

const Docente = require('../../model/Docente')
const Foto = require('../../model/Foto')
const User = require('../../model/User')

const models = [Docente, Foto, User]

const dbConnection =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
        database: dataBaseConfig.database,
        dialect: 'postgres',
        username: dataBaseConfig.username,
        password: dataBaseConfig.password,
        port: dataBaseConfig.port,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${dataBaseConfig.username}:${dataBaseConfig.password}@${dataBaseConfig.host}/${dataBaseConfig.database}`,
      )

models.forEach((model) => model.init(dbConnection))
models.forEach(
  (model) => model.associate && model.associate(dbConnection.models),
)
