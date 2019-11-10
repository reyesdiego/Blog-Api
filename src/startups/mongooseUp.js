"use strict";

const mongoose = require("mongoose");
const { mongo } = require("../../settings");
const { log } = require("../utils");

module.exports = callback => {
  mongoose.Promise = Promise;

  mongoose.set("useFindAndModify", false); //get rid of deprecation warning

  let connect = () => {
    if (mongo.options) {
      mongoose
        .connect(mongo.host, mongo.options, (err, data) => {
          if (!err) if (callback) callback(mongoose.connection);
        })
        .catch(err => log.red(err));
    } else {
      mongoose.connect(mongo.url).catch(() => log.red(err));
    }
  };

  mongoose.connection.on("connecting", function() {
    log.black(`MongoDB - Connecting to Mongo ...${mongo.host}`);
  });

  mongoose.connection.on("error", function(err) {
    log.red("MongoDB - Could not connect to MongoDB");
  });

  mongoose.connection.on("disconnected", function(err) {
    log.red("MongoDB - Lost MongoDB connection...");
  });

  mongoose.connection.on("connected", function(e) {
    log.green(
      `MongoDB - Connected to ${mongoose.connection.host} - DB: ${mongoose.connection.name}. (Mongoose ${mongoose.version})`
    );
  });

  mongoose.connection.on("reconnected", function() {
    log.yellow(
      `MongoDB - Reconneted to MongoDB on ${mongoose.connection.host}. (Mongoose ${mongoose.version})`
    );
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      log.red(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit();
    });
  });

  connect();
};
