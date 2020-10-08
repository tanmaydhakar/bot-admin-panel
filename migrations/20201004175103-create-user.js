'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(async () => {
        return queryInterface.createTable('users', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          display_name: {
            type: Sequelize.STRING(100),
            allowNull: false
          },
          first_name: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          last_name: {
            type: Sequelize.STRING(50),
            allowNull: false
          },
          email: {
            type: Sequelize.STRING(50),
            unique: true,
            allowNull: false
          },
          phone: {
            type: Sequelize.STRING(15),
            allowNull: false
          },
          password: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          reset_password_token: {
            type: Sequelize.TEXT
          },
          roles: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.TEXT)
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};