const sequelize = require("./src/config/dbConfig");
const dbAssociations = require("./src/model");
const Role = require("./src/model/Role");
const uuid = require("uuid");
async function migrate() {
  dbAssociations();
  await sequelize.sync({ force: true });
  await Role.create({
    id: uuid.v4(),
    name: "STAFF",
  });
  await Role.create({
    id: uuid.v4(),
    name: "ADMIN",
  });
}
migrate();
