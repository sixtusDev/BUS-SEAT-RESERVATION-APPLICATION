// Import statements
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { busSchema } = require("./Bus");
const { userSchema } = require("./User");

// Ticket schema
const ticketSchema = new mongoose.Schema({
  bus: {
    type: busSchema,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  sits: [{ type: String, required: true }],
  passengers: { type: Object, required: true },
});

const schema = Joi.object({
  busId: Joi.objectId().required().label("Bus"),
  userId: Joi.objectId().required().label("User"),
  tripScheduleId: Joi.objectId().required().label("Trip Schedule"),
  totalAmount: Joi.number().required().label("Amount"),
  sits: Joi.array().required().label("Sit number"),
  passengers: Joi.object().required().label("Passener name(s)"),
  departureDate: Joi.date().required().label("Departure Date"),
  arrivalDate: Joi.date().required().label("Arrival Date"),
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Export statements
exports.Ticket = Ticket;
exports.schema = schema;
