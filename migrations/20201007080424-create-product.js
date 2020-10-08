'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
     return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
       .then(async () => {
     await queryInterface.createTable('products', {
       id: {
         allowNull: false,
         primaryKey: true,
         type: Sequelize.DataTypes.UUID,
         defaultValue: Sequelize.literal('uuid_generate_v4()')
       },
       title: {
         type: Sequelize.TEXT,
         allowNull:false
       },
       description: {
         type: Sequelize.TEXT,
         allowNull:false
       },
       youtube_link: {
         type: Sequelize.TEXT
       },
       thumbnail_link: {
         type: Sequelize.TEXT
       },
       product_images: {
         type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
       },
       created_by: {
         type: Sequelize.DataTypes.UUID,
         allowNull: false,
         references: {
           model: 'users',
           key: 'id'
         }
       },
       updated_by: {
         type: Sequelize.DataTypes.UUID,
         allowNull: false,
         references: {
           model: 'users',
           key: 'id'
         }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};