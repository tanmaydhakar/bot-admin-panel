'use strict';

const FS = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const admin = JSON.parse(FS.readFileSync(path.resolve('./seeders/dataset/admin.json'), 'utf8'));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      display_name: admin.display_name,
      first_name: admin.first_name,
      last_name: admin.last_name,
      email: admin.email,
      phone: admin.phone,
      password: bcrypt.hashSync(admin.password, 10),
      roles: admin.roles,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
