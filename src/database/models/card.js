"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    static associate(models) {
     
      

  Cards.belongsTo(models.Users, { foreignKey: "userid", as: "cardUser" });
  Cards.belongsTo(models.Categories, { foreignKey: "category", as: "categories" });
  Cards.hasMany(models.cardReports, { foreignKey: "cardid", as: "report" });

    }
  }

  Cards.init(
    {

      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      times: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cards",

    }
  );

  return Cards;
};
