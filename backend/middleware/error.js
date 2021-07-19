// Error middleware for handling internel server problems like:
// 1. Database problem
// 2. Server problem
module.exports = function (error, req, res, next) {
  console.log(error);
  res.status(500).send("Something failed");
};
