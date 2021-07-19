// Import statements
require("express-async-errors");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const bus = require("./routes/bus");
const tripSchedule = require("./routes/tripSchedule");
const user = require("./routes/user");
const ticket = require("./routes/ticket");
const auth = require("./routes/auth");
const error = require("./middleware/error");

const app = express(); // Initialize app by calling express

// Check if all environment variables have been set
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

// Connect to mongodb database
mongoose
  .connect("mongodb://localhost:27017/bus-reservation", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb... ", err));

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

const PORT = process.env.PORT || 5000;
// Start a local server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
