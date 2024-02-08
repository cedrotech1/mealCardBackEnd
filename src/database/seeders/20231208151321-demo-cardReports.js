"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("cardReports", [
      {
        cardid: "1",
        plates: "2",
        date: "2024-05-07",
        time: "10:00 AM",
        status: "used",
        restaurent:'1',
        categoryname:'vip',
        price:'4500',
        customernames:'carine ingabire',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        cardid: "2",
        plates: "1",
        date: "2024-01-01",
        time: "10:30 AM",
        status: "used",
        restaurent:'2',
        categoryname:'vip',
        price:'4500',
        customernames:'carine ingabire',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

   


    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("cardReports", null, {});
  },
};
