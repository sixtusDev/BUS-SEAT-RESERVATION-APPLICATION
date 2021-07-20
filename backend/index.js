// Import statements
const express = require("express");

const app = express(); // Initialize app by calling express

require("./startup/logging");
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation")();

const PORT = process.env.PORT || 5000;
// Start a local server
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
