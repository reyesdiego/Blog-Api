const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const http = require("http");
const settings = require("../../settings");
const routes = require("../routes");

module.exports = () => {
  const app = express();

  //Config
  app.disable("x-powered-by");
  app.use(cors());
  app.use(compression({ level: 1 }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/api-v1", routes);

  const server = http.createServer(app);
  //Server starts
  server.listen(settings.http.port, () =>
    console.log(
      `API running on port ${settings.http.port}. (${process.version}) pid:${
        process.pid
      } - ${new Date()}`
    )
  );

  app.use((req, res, next) => {
    let err = new Error("Route Not Found in Containn Blog API");
    err.status = 404;
    next(err);
  });

  return { app };
};
