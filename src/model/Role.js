const sequelize = require("../config/dbConfig");
const DataTypes = require("sequelize");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: false,
    tableName: "roles",
  }
);

module.exports = Role;
