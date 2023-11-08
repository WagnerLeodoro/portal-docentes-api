const { Model, Sequelize } = require('sequelize')
const appConfig = require('../config/appConfig')

class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio.',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio.',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/${this.getDataValue('filename')}`
          },
        },
      },
      {
        sequelize,
        tableName: 'photos',
      },
    )
    return this
  }

  static associate(models) {
    this.belongsTo(models.Docente, { foreignKey: 'docente_id' })
  }
}

module.exports = Foto
