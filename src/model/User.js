import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig";

export const User = sequelize.define(
  "user",
  {
    Id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
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
  },
  { timestamps: true }
);
