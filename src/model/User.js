const DataTypes = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define(
  "user",
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
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "user", timestamp: false }
);
module.exports = User;
