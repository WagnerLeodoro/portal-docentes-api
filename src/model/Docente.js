const { Sequelize, Model } = require('sequelize')

class Docente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        formacao: Sequelize.STRING,
        formacao_adicional: Sequelize.STRING,
        projetos: Sequelize.STRING,
        area_atuacao_senac: Sequelize.STRING,
      },
      {
        sequelize,
      },
    )

    return this
  }
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'docente_id' })
  }
}

module.exports = Docente
