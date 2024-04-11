const dotenv = require("dotenv");
const sequelize = require("./config/dbConfig");
const server = require("../server");

dotenv.config();
async function main() {
  await sequelize
    .authenticate()
    .then(() => {
      sequelize.sync();
      server.listen(3000, "0.0.0.0", function () {
        if (server.listening) {
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
main();
