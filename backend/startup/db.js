const winston = require("winston");
const mongoose = require("mongoose");

// Connect to mongodb database
module.exports = function () {
  mongoose
    .connect("mongodb://localhost:27017/bus-reservation")
    .then(() => winston.info("Connected to MongoDB..."));
};
