const config = require("config");

module.exports = function () {
  // Check if all environment variables have been set
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
