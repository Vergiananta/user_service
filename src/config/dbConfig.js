const Sequelize = require("sequelize");
const sequelize = new Sequelize("absent", "postgres", "shaolinsocer", {
  dialect: "postgres",
  host: "localhost",
  logging: console.log,
  define: {
    timestamps: false,
  },
});
module.exports = sequelize;
