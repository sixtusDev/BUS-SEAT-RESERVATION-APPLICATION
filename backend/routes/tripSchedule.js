// Import Statements
const express = require("express");
const moment = require("moment");
const { TripSchedule, schema } = require("../model/TripSchedule");
const { Bus } = require("../model/Bus");
const { validate } = require("../utils/helperFunctions");
const router = express.Router();

// Get trip schedules with search Strings: from, to, and date
router.get("/search", async (req, res) => {
  const { from, to, date } = req.query;
  const tripSchedules = await TripSchedule.find({
    fromLocation: from,
    toLocation: to,
    departureDate: {
      $gte: new Date(new Date(date).setHours(00, 00, 00)),
      $lt: new Date(new Date(date).setHours(23, 59, 59)),
    },
  });
  if (tripSchedules.length === 0)
    return res
      .status(404)
      .send(
        "Make sure you use [30th July 2021] as date; There are no trip schedules for your location and date. This app is still in development process"
      );
  res.send(tripSchedules);
});

// Get all trip schedules in the database
router.get("/", async (req, res) => {
  const tripSchedules = await TripSchedule.find();
  res.send(tripSchedules);
});

// Get a trip schedule with a given ID
router.get("/:id", async (req, res) => {
  const tripSchedule = await TripSchedule.findById(req.params.id).exec();
  if (!tripSchedule)
    return res.status(404).send("Trip Schedule with the given Id not found");
  res.send(tripSchedule);
});

// Post a new trip Schedule to the database
router.post("/", async (req, res) => {
  const {
    fromLocation,
    toLocation,
    departureDate,
    arrivalDate,
    childTransportFare,
    adultTransportFare,
    busId,
  } = req.body;
  const errors = validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  const bus = await Bus.findById(busId).exec();
  if (!bus) return res.status(404).send("Bus with the given id not found");
  const newTripSchedule = new TripSchedule({
    fromLocation,
    toLocation,
    departureDate,
    arrivalDate,
    childTransportFare,
    adultTransportFare,
    bus: {
      _id: bus._id,
      busNumber: bus.busNumber,
      totalSeats: bus.totalSeats,
      busModel: bus.busModel,
    },
    availableSeats: bus.totalSeats,
  });
  await newTripSchedule.save();
  res.send(newTripSchedule);
});

// Edit a trip schedule with the id
router.put("/:id", async (req, res) => {
  const {
    fromLocation,
    toLocation,
    departureDate,
    arrivalDate,
    childTransportFare,
    adultTransportFare,
    busId,
  } = req.body;
  const bus = await Bus.findById(busId).exec();
  if (!bus) return res.status(404).send("Bus not found");
  const tripSchedule = await TripSchedule.findByIdAndUpdate(
    req.params.id,
    {
      fromLocation,
      toLocation,
      departureDate,
      arrivalDate,
      childTransportFare,
      adultTransportFare,
      bus: {
        _id: bus._id,
        busNumber: bus.busNumber,
        totalSeats: bus.totalSeats,
        busModel: bus.busModel,
      },
      availableSeats: bus.totalSeats,
    },
    { new: true }
  );
  if (!tripSchedule) return res.status(404).send("Trip Schedule not found");
  res.send(tripSchedule);
});

// Delete a trip schedule with a given id
router.delete("/:id", async (req, res) => {
  const tripSchedule = await TripSchedule.findByIdAndDelete(req.params.id);
  if (!tripSchedule) return res.status(404).send("Trip schedule not found!");
  res.send(tripSchedule);
});

module.exports = router;
