'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      category: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userid: {  // Fix typo here
        allowNull: false,
        type: Sequelize.INTEGER
      },
      times: {  // Fix typo here
        allowNull: false,
        type: Sequelize.INTEGER
      },
      duration: {  // Fix typo here
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {  // Fix typo here
        allowNull: false,
        type: Sequelize.STRING
      },
    
    
    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};
