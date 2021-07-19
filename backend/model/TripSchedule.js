// Imports statements
const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { busSchema } = require("./Bus");

// Create a database model schema for trip schedules
const tripScheduleSchema = new mongoose.Schema({
  fromLocation: {
    type: String,
    required: true,
    min: 5,
    max: 200,
    trim: true,
    lowercase: true,
  },
  toLocation: {
    type: String,
    required: true,
    min: 5,
    max: 200,
    trim: true,
    lowercase: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  childTransportFare: Number,
  adultTransportFare: Number,
  bus: {
    type: busSchema,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: Array,
    required: true,
  },
});

const obj = {
  fromLocation: Joi.string()
    .min(5)
    .max(200)
    .required()
    .label("Point of departure"),
  toLocation: Joi.string().min(5).max(200).required().label("Destination"),
  departureDate: Joi.date().required().label("Date of departure"),
  arrivalDate: Joi.date().required().label("Date of arrival"),
  busId: Joi.objectId().required().label("Bus"),
};

const schema = Joi.object({
  ...obj,
  childTransportFare: Joi.number().label("Child tranport fare"),
  adultTransportFare: Joi.number().label("Adult tranport fare"),
})
  .or("childTransportFare", "adultTransportFare")
  .label("Transport fare"); // called the or method to allow for either child or adult transport fare

const TripSchedule = mongoose.model("TripSchedule", tripScheduleSchema);

// Export statements
exports.TripSchedule = TripSchedule;
exports.schema = schema;
