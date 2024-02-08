"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        isNumeric: true,
        unique: true,
      },
      // privileges: {
      //   type: Sequelize.JSON,
      //   defaultValue: [],
      // },
      role: {

        type: Sequelize.STRING,
        allowNull: false,
      },
      restaurents: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active",
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
