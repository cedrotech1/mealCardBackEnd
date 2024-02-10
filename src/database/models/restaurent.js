"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Restaurent extends Model {
    static associate(models) {

      Restaurent.hasMany(models.Users, {
        foreignKey: "restaurents",
        as: "restaurentadmin",
      });

      Restaurent.hasMany(models.Users, {
        foreignKey: "restaurents",
        as: "customer",
      });

   
      Restaurent.hasMany(models.Users, {
        foreignKey: "restaurents",
        as: "employee",
      });



      Restaurent.hasMany(models.Categories, { foreignKey: "restaurent", as:'restaurantCategories' });

      Restaurent.hasMany(models.Users, {
        foreignKey: "restaurents",
        as: "restusers",
      });





    }
  }

  Restaurent.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Restaurents",

    }
  );

  return Restaurent;
};
