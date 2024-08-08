"use strict";
import bcrypt from "bcrypt";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10; // Number of salt rounds for bcrypt

    // Hashed passwords for different users
    const hashedPasswordAdmin = await bcrypt.hash("admin", saltRounds);
    const hashedPasswordResAdmin = await bcrypt.hash("12345", saltRounds);
    // const hashedPasswordStudent = await bcrypt.hash("student123", saltRounds);
    // const hashedPasswordLecturer = await bcrypt.hash("lecturer123", saltRounds);

    return queryInterface.bulkInsert("Users", [
      {
        firstname: "Root",
        lastname: "User",
        email: "superadmin@gmail.com",
        phone: "1232456780",
        role: "superadmin",
        status: "active",
        password: hashedPasswordAdmin,
        gender: "male",
        address: "huye/tumba",
        image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707132016/Card/vdprgfgbft6xmheq0b1n.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   firstname: "Cedrick",
      //   lastname: "hakuzimana",
      //   email: "cedro@example.com",
      //   phone: "987683543210",
      //   role: "restaurentadmin",
      //   status: "active",
      //   restaurents: "2",
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   address: "huye/tumba",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707141452/Card/j5gzyptsincufsf2kcht.png',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstname: "issa",
      //   lastname: "nsabimana",
      //   email: "issa@example.com",
      //   phone: "98766143230",
      //   role: "restaurentadmin",
      //   status: "active",
      //   restaurents: "1",
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   address: "huye/tumba",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707203511/Card/adu97ywbmfpcoiohprqw.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },


      // {
      //   firstname: "kevin",
      //   lastname: "mbonigaba",
      //   email: "kevin@example.com",
      //   phone: "987654320130",
      //   role: "employee",
      //   status: "active",
      //   restaurents: "1",
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   address: "huye/tumba",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707203511/Card/adu97ywbmfpcoiohprqw.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstname: "tresor",
      //   lastname: "alain..",
      //   email: "alain@example.com",
      //   phone: "98765426260",
      //   role: "employee",
      //   status: "active",
      //   restaurents: "2",
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   address: "huye/tumba",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707205814/Card/vdq5rwknwba1vffdhrdf.png',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstname: "byungura",
      //   lastname: "danny",
      //   email: "byungura@example.com",
      //   phone: "95765663210",
      //   role: "customer",
      //   status: "active",
      //   restaurents: null,
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   address: "huye/tumba",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707206238/Card/wk6rzsuuryv3i86o3vyd.png',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   firstname: "carime",
      //   lastname: "merci",
      //   email: "carine@example.com",
      //   phone: "287651543210",
      //   role: "customer",
      //   status: "active",
      //   restaurents: null,
      //   password: hashedPasswordResAdmin,
      //   gender: "male",
      //   image:'http://res.cloudinary.com/dzl8xve8s/image/upload/v1707205907/Card/kcuejsxpsjych5o0smey.png',
      //   address: "huye/tumba",
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
