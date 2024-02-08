"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Restaurents", [
      {
        name: "Kiza",
        address: "huye/ngoma",
        description: "our restourent is good  fo students becouse for discount ! peaple you can reserve cards from our restaurent throught different ways !! ",
        status: "active",
        email: "kiza@gmail.com",
        phone: "078545454",
        image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707140533/Card/kljz6x8mtuorftebs21a.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "umucyo",
        address: "huye/tumba",
        description: "restoura for both students and normal peaple you can reserve cards from our restaurent throught different ways !! ",
        status: "active",
        email: "umucyo@gmail.com",
        phone: "078545454",
        image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707131921/Card/ggdlhwcdxqk5jma7z6kv.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Add more user data objects as needed       
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Restaurents", null, {});
  },
};
