const config = require("config");

module.exports = function () {
  // Check if all environment variables have been set
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey env is not defined.");
  }
  if (!config.get("email")) {
    throw new Error("email env is not defined");
  }
  if (!config.get("emailPassword")) {
    throw new Error("emailPassword env is not defined");
  }
};
