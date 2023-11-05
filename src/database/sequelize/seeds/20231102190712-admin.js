'use strict'
const bcrypt = require('bcryptjs')
require('dotenv/config')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: process.env.ADMIN_USER,
          email: process.env.ADMIN_EMAIL,
          password: bcrypt.hashSync(
            process.env.ADMIN_PASSWORD,
            bcrypt.genSaltSync(8),
          ),
          isAdmin: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
