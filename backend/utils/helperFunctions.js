// Validate error helper function for validating request body using Joi
exports.validate = function (payload, schema) {
  const result = schema.validate(payload, { abortEarly: false });
  if (!result.error) return null;
  const errors = {};
  for (let item of result.error.details) {
    const path = item.path[0];
    if (path) {
      errors[path] = item.message;
    } else {
      errors["transportFare"] = item.message;
    }
  }
  return errors;
};

exports.generateRandomIndexForArrayIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// This function converts a number to an array of numbers
// starting from 1 to the number
// 20 => [1, 2, 3, ..., 20]
// Type: can be either string or number in order to return an
// array of numbers
exports.numberToArray = function (number) {
  return Array.from(Array(number).keys(), (n) => n + 1);
};
