// Import Statements
const mongoose = require("mongoose");
const tripSchedules = require("./tripSchedules.json");
const { TripSchedule } = require("../model/TripSchedule");

// Connect to mongodb database
mongoose
  .connect("mongodb://localhost:27017/bus-reservation", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb... ", err));

async function seed() {
  await TripSchedule.deleteMany();
  tripSchedules.forEach(async (tripSchedule) => {
    tripSchedule = new TripSchedule(tripSchedule);
    await tripSchedule.save();
  });
  console.log("Seeds to db completed successfully!");
}

seed();
