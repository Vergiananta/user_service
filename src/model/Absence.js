const sequelize = require("../config/dbConfig");
const DataTypes = require("sequelize");

const Absence = sequelize.define(
  "Absence",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    timeIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    timeOut: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "absence", timestamp: false }
);
module.exports = Absence;
