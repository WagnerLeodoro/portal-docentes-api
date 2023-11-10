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
        process.env.DATABASE,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
          host: process.env.DATABASE_HOST,
          dialect: 'postgres',
        },
      )

models.forEach((model) => model.init(conn))
models.forEach((model) => model.associate && model.associate(conn.models))
