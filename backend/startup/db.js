// Import statements
const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

// Connect to mongodb database
module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => winston.info("Connected to MongoDB..."));
};
