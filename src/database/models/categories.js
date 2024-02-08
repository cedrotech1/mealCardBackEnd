"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {

      Categories.belongsTo(models.Restaurents, { foreignKey: "restaurent" ,as:"resto" });
      Categories.hasMany(models.Cards, { foreignKey: "category", as:"cards" });

      // cardcategory
    }
  }

  Categories.init(
    {
      restaurent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Categories",

    }
  );

  return Categories;
};
