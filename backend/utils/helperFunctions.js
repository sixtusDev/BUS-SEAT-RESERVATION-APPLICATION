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
