// Import Statements
const express = require("express");
const { Bus, schema } = require("../model/Bus");
const { validate } = require("../utils/helperFunctions");

const router = express.Router();

// Get all the buses in the database
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.send(buses);
});

// Get a specific bus from database using id query string
router.get("/:id", async (req, res) => {
  const bus = await Bus.findById(req.params.id).exec();
  if (!bus) return res.status(404).send("Bus with the given id not found");
  res.send(bus);
});

// Post request to add a new bus in the database bus collection
router.post("/", async (req, res) => {
  const { busNumber, busModel, totalSeats } = req.body;
  const errors = validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  const bus = await Bus.findOne({ busNumber: req.body.busNumber });
  if (bus) return res.status(400).send("Bus already exist in the data base");
  const newBus = new Bus({
    busNumber,
    busModel,
    totalSeats,
  });
  await newBus.save();
  res.send(newBus);
});

// Edit a bus with a given id
router.put("/:id", async (req, res) => {
  const { busNumber, busModel, totalSeats } = req.body;
  const errors = validate(req.body, schema);
  if (errors) return res.status(400).send(errors);
  const bus = await Bus.findByIdAndUpdate(
    req.params.id,
    {
      busNumber,
      busModel,
      totalSeats,
    },
    { new: true }
  );
  if (!bus) return res.status(404).send("Bus not found");
  res.send(bus);
});

// Delete a bus with a given Id
router.delete("/:id", async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);
  if (!bus) return res.status(404).send("Bus not found");
  res.send(bus);
});

module.exports = router;
