'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docentes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      formacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      formacao_adicional: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projetos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area_atuacao_senac: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('docentes')
  },
}
