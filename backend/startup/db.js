// Import statements
const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

// Connect to mongodb database
module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => winston.info("Could not connect to mongodb... ", err));
};
