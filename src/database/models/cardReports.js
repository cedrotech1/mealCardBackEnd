"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class cardReports extends Model {
    static associate(models) {

      cardReports.belongsTo(models.Cards, { foreignKey: "cardid" ,as:"report" });
      // Categories.hasMany(models.Cards, { foreignKey: "category", as:"cards" });

      // cardcategory
    }
  }

  cardReports.init(
    {
      cardid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plates: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // addition
      restaurent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customernames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    
    },
    {
      sequelize,
      modelName: "cardReports",

    }
  );

  return cardReports;
};
