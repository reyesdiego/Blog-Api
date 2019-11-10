const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const settings = require("../../settings");
const routes = require("../routes");
const mongooseUp = require("./mongooseUp");
const { log } = require("../utils");

module.exports = () => {
  const app = express();

  //Config
  app.disable("x-powered-by");
  app.use(cors());
  app.use(compression({ level: 1 }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //api version 1
  app.use("/api-v1", routes);

  app.on("uncaughtException", err => {
    red(err.stack);
    process.exit(2);
  });

  app.use((req, res, next) => {
    let err = new Error("Route Not Found in Blog API");
    err.status = 404;
    next(err);
  });

  mongooseUp(async connection => {
    try {
      await app.listen(settings.http.port);
      app.emit("app_started");
      log.green(
        `API running on port ${settings.http.port}. (${process.version}) pid:${
          process.pid
        } - ${new Date()}`
      );
    } catch (err) {
      log.red("Error starting Blog app:" + err);
      connection.close(() => {
        process.exit(2);
      });
    }
  });

  return app;
};
