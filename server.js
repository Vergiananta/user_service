import express from "express";
import cors from "cors";
import http from "http";
import router from "./src/routes";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type: "application/json",
    limit: "50mb",
    extended: true,
  })
);
app.use(router);
const server = http.createServer(app);
server.on("error", function (e) {
  logEvent.emit("APP-ERROR", {
    logTitle: "APP FAILED",
    logMessage: e,
  });
});

export default server;
