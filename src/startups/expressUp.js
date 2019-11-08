const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const settings = require("../../settings");
const routes = require("../routes");
const mongooseUp = require("./mongooseUp");
const { green, red } = require("../utils");

module.exports = () => {
  const app = express();

  //Config
  app.disable("x-powered-by");
  app.use(cors());
  app.use(compression({ level: 1 }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //
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

  mongooseUp(async () => {
    try {
      await app.listen(settings.http.port);
      app.emit("app_started");
      green(
        `API running on port ${settings.http.port}. (${process.version}) pid:${
          process.pid
        } - ${new Date()}`
      );
    } catch (ex) {
      red("Error starting Blog app:" + err);
      process.exit(2);
    }
  });

  return app;
};
