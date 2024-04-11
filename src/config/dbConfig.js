const Sequelize = require("sequelize");
const sequelize = new Sequelize("absent", "postgres", "shaolinsocer", {
  dialect: "postgres",
  host: "localhost",
  define: {
    timestamps: false,
  },
});
module.exports = sequelize;
