"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        restaurent: "1",
        name: "vvip",
        description: "category description for category description forcategory description forcategory description forcategory description forcategory description for.......",
        price: "50000",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        restaurent: "2",
        name: "vip",
        description: "category description forcategory description forcategory description forcategory description forcategory description forcategory description for .......",
        price: "40000",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
