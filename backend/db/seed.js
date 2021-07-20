// Import Statements
const mongoose = require("mongoose");
const tripSchedules = require("./tripSchedules.json");
const bus = require("./bus.json");
const { TripSchedule } = require("../model/TripSchedule");
const { Bus } = require("../model/Bus");

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
  // await Bus.deleteMany();
  // bus.forEach(async (b) => {
  //   b = new Bus(b);
  //   await b.save();
  // });
  await TripSchedule.deleteMany();
  const bus1 = await Bus.findOne({ busNumber: "YLA231" });
  tripSchedules.forEach(async (tripSchedule) => {
    tripSchedule = new TripSchedule(tripSchedule);
    await tripSchedule.save();
  });
  console.log("Seeds to db completed successfully!");
}

seed();
