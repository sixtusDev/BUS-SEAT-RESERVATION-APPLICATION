// Import statements
const express = require("express");
const { Bus } = require("../model/Bus");
const { schema, Ticket } = require("../model/Ticket");
const { TripSchedule } = require("../model/TripSchedule");
const { User } = require("../model/User");
const { validate } = require("../utils/helperFunctions");

const router = express.Router();

// Route handler for booking a bus ticket
router.post("/", async (req, res) => {
  const errors = validate(req.body, schema);
  const {
    busId,
    userId,
    totalAmount,
    sits,
    passengers,
    departureDate,
    arrivalDate,
    tripScheduleId,
  } = req.body;
  if (errors) return res.status(400).send(errors);
  const bus = await Bus.findById(busId).exec();
  if (!bus) return res.status(404).send("Bus with the given Id not found");
  const user = await User.findById(userId).exec();
  if (!user) return res.status(404).send("User with the given Id not found");
  const tripSchedule = await TripSchedule.findById(tripScheduleId).exec();

  const ticket = new Ticket({
    user: {
      _id: user._id,
      firstName: user.firstName,
      secondName: user.secondName,
      email: user.email,
    },
    bus: {
      _id: bus._id,
      busNumber: bus.busNumber,
      busModel: bus.busModel,
    },
    totalAmount,
    sits,
    passengers,
    departureDate,
    arrivalDate,
  });
  // Update the available seats for trip schedule
  tripSchedule.availableSeats = tripSchedule.availableSeats - sits.length;
  // Update the booked seats for trip schedule
  tripSchedule.bookedSeats = [...tripSchedule.bookedSeats, ...sits];
  await tripSchedule.save();
  await ticket.save();
  res.send(ticket);
});

module.exports = router;
