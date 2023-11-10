const dotenv = require('dotenv')
dotenv.config()

const { Sequelize } = require('sequelize')
const dataBaseConfig = require('../../config/database')

const Docente = require('../../model/Docente')
const Foto = require('../../model/Foto')
const User = require('../../model/User')

const models = [Docente, Foto, User]

const conn =
  process.env.NODE_ENV !== 'production'
    ? new Sequelize(dataBaseConfig)
    : new Sequelize(
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        process.env.DATABASE,
        {
          dialect: 'postgres',
          port: process.env.DATABASE_PORT,
          host: process.env.DATABASE_HOST,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
            keepAlive: true,
          },
          ssl: true,
        },
      )

models.forEach((model) => model.init(conn))
models.forEach((model) => model.associate && model.associate(conn.models))
