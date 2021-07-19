const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, schema } = require("../model/User");
const { validate } = require("../utils/helperFunctions");

const router = express.Router();

// Register new user route handler.
router.post("/", async (req, res) => {
  const { firstName, secondName, email, password, confirmPassword } = req.body;
  const errors = validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  if (password != confirmPassword)
    return res.status(400).send({ passwordMisMatch: "Passwords don't match" });

  let user = await await User.findOne({ email });
  if (user) return res.status(400).send("User already exist");
  user = new User({
    firstName,
    secondName,
    email,
    password,
  });
  const hash = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, hash);
  await user.save();
  // Generate a new jwt
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "firstName", "secondName", "email"]));
});

module.exports = router;
