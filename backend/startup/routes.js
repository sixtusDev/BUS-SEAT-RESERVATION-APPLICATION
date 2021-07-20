// Import statements
const express = require("express");
const bus = require("../routes/bus");
const tripSchedule = require("../routes/tripSchedule");
const user = require("../routes/user");
const ticket = require("../routes/ticket");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  // Middlewares
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  app.use(express.json());
  app.use("/api/bus", bus);
  app.use("/api/trip", tripSchedule);
  app.use("/api/user", user);
  app.use("/api/ticket", ticket);
  app.use("/api/auth", auth);
  app.use(error);
};
