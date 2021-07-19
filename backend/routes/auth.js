// Import statements
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../model/User");
const { validate } = require("../utils/helperFunctions");

const router = express.Router();

// Sign in route handler for authentication
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const errors = validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");
  // Generate a new jwt
  const token = user.generateAuthToken();
  res.send(token);
});

// Create a schema object for joi to be passed as an argument in validate function
const schema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.required(),
});

module.exports = router;
