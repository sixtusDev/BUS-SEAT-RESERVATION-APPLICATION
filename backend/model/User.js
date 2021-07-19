// Import Statements
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Database schema model for a user object
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: true,
    min: 2,
    max: 200,
    trim: true,
  },
  secondName: {
    type: String,
    // required: true,
    min: 2,
    max: 200,
    trim: true,
  },
  email: {
    type: String,
    // required: true,
    min: 2,
    max: 200,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
    unique: true,
    min: 5,
    max: 2000,
  },
});

// Methods for user object
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      secondName: this.secondName,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

const schema = Joi.object({
  firstName: Joi.string().min(2).max(200).required().label("First name"),
  secondName: Joi.string().min(2).max(200).required().label("Second name"),
  email: Joi.string().min(2).max(200).email().required().label("Email"),
  password: Joi.string().min(8).max(200).required().label("Password"),
  confirmPassword: Joi.string()
    .min(8)
    .max(200)
    .required()
    .label("Confirm password"),
});

// Export statements
exports.User = User;
exports.schema = schema;
exports.userSchema = userSchema;
