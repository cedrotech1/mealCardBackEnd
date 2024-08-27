"use strict";
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10; // Number of salt rounds for bcrypt

    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);

    return queryInterface.bulkInsert("Users", [
      {
        firstname: "Alain",
        lastname: "Voltaire",
        email: "shemahalainvoltaire@gmail.com",
        phone: "0780000000",
        role: "superadmin",
        status: "active",
        password: hashedPasswordAdmin,
        gender: "male",
        address: "huye/tumba",
        image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1724766686/Card/nrujel7xhcokiikabpyj.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
