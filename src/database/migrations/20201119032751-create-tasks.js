'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return await queryInterface.createTable('tarefas', { 
       id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
       },
       state: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
         allowNull: false
       },
       created_at: {
         type: Sequelize.DATE,
         allowNull: false
       },
       updated_at: {
         type: Sequelize.DATE,
         allowNull: false
       }
      });

  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.dropTable('tarefas');

  }
};
