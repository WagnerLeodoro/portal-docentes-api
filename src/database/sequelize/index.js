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
    : new Sequelize({
        dialect: 'postgres',
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
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

models.forEach((model) => model.init(conn))
models.forEach((model) => model.associate && model.associate(conn.models))
