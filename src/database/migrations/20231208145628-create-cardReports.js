'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cardReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardid: { 
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      plates: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
         // addition
         restaurent: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        categoryname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        customernames: {
          type: Sequelize.STRING,
          allowNull: false,
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
    await queryInterface.dropTable('cardReports');
  }
};
