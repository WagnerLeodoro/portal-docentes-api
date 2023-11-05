const { Sequelize } = require('sequelize')
const dataBaseConfig = require('../../config/database')

const Docente = require('../../model/Docente')
const Foto = require('../../model/Foto')
const User = require('../../model/User')

const models = [Docente, Foto, User]

const conn = new Sequelize(
  dataBaseConfig.database,
  dataBaseConfig.username,
  dataBaseConfig.password,
  {
    ...dataBaseConfig,
    host: 'database_docentes',
  },
)

models.forEach((model) => model.init(conn))
models.forEach((model) => model.associate && model.associate(conn.models))
