"use strict";

const mongoose = require("mongoose");
const { mongo } = require("../../settings");

module.exports = callback => {
  mongoose.Promise = Promise;

  mongoose.set("useFindAndModify", false); //get rid of deprecation warning

  let connect = () => {
    if (mongo.options) {
      mongoose
        .connect(mongo.host, mongo.options, (err, data) => {
          if (!err) if (callback) callback(mongoose.connection);
        })
        .catch(err => console.error(err));
    } else {
      mongoose.connect(mongo.url).catch(() => console.error(err));
    }
  };

  mongoose.connection.on("connecting", function() {
    console.log(`MongoDB - Connecting to Mongo ...`);
  });

  mongoose.connection.on("error", function(err) {
    console.log("MongoDB - Could not connect to MongoDB");
  });

  mongoose.connection.on("disconnected", function(err) {
    console.log("MongoDB - Lost MongoDB connection...");
  });

  mongoose.connection.on("connected", function(e) {
    console.log(
      `MongoDB - Connected to ${mongoose.connection.host} - DB: ${mongoose.connection.name}. (Mongoose ${mongoose.version})`
    );
  });

  mongoose.connection.on("reconnected", function() {
    console.log(
      `MongoDB - Reconneted to MongoDB on ${mongoose.connection.host}. (Mongoose ${mongoose.version})`
    );
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.info(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit();
    });
  });

  connect();
};
