// Import Statements
const mongoose = require("mongoose");
const Joi = require("joi");

// Create a schema for bus
const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    // required: true,
    trim: true,
    min: 5,
    max: 200,
  },
  busModel: {
    type: String,
    // required: true,
    trim: true,
    min: 5,
    max: 200,
  },
  totalSeats: {
    type: Number,
    // required: true,
  },
});

// Input validation using joi
const schema = Joi.object({
  busNumber: Joi.string().min(5).max(200).required().label("Bus number"),
  busModel: Joi.string().min(5).max(200).required().label("Bus model"),
  totalSeats: Joi.number().required().label("Total Seats"),
});

const Bus = mongoose.model("Bus", busSchema);

// Export statements
exports.Bus = Bus;
exports.busSchema = busSchema;
exports.schema = schema;
