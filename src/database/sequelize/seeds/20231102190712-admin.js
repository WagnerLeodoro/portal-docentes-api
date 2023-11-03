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
          name: 'John Doe',
          email: 'john.doe@mail.com',
          password: bcrypt.hashSync(
            process.env.ADMIN_PASSWORD,
            bcrypt.genSaltSync(8),
          ),
          isAdmin: true,
          created_at: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
