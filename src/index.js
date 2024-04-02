import dotenv from "dotenv";
import { sequelize } from "./config/dbConfig";

dotenv.config();
sequelize
  .authenticate()
  .then(() => {
    server.listen(process.env.APP_PORT, "0.0.0.0", function () {
      if (server.listening) {
        logEvent.emit(INFO, {
          logTitle: "SERVER",
          logMessage: `Server is listening on ${process.env.APP_PORT}`,
        });
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
