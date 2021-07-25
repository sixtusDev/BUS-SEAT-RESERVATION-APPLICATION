// Import Statements
require("../startup/db")();
const bus = require("./bus.json");
const { TripSchedule } = require("../model/TripSchedule");
const { Ticket } = require("../model/Ticket");
const { Bus } = require("../model/Bus");
const { numberToArray } = require("../utils/helperFunctions");
const {
  generateRandomIndexForArrayIndex,
} = require("../utils/helperFunctions");
const {
  fromLocation,
  toLocation,
  departureDate,
  arrivalDate,
  childTransportFare,
  adultTransportFare,
  availableSeats,
  bookedSeats,
} = require("./tripSchedule");

// Seed bus to mongodb database
async function seedBus() {
  await Bus.deleteMany();
  bus.forEach(async (b) => {
    b = new Bus(b);
    await b.save();
  });
}

// get bus collection from mongodb database
async function getBus() {
  return Bus.find();
}

// Seed tripSchedules to mongodb database
async function seedTripSchedule() {
  await seedBus();
  await TripSchedule.deleteMany();
  await Ticket.deleteMany();
  const buses = await getBus();

  // Generate a number of trip schedules we want and then
  // populate dynamically to the database
  numberToArray(1000).forEach(async (tripSchedule) => {
    const busIndex = generateRandomIndexForArrayIndex(buses);
    const fromLocationIndex = generateRandomIndexForArrayIndex(fromLocation);
    const toLocationIndex = generateRandomIndexForArrayIndex(toLocation);
    const departureDateIndex = generateRandomIndexForArrayIndex(departureDate);
    const arrivalDateIndex = generateRandomIndexForArrayIndex(arrivalDate);
    const childTransportFareIndex =
      generateRandomIndexForArrayIndex(childTransportFare);
    const adultTransportFareIndex =
      generateRandomIndexForArrayIndex(childTransportFare);
    if (fromLocationIndex !== toLocationIndex) {
      tripSchedule = {
        fromLocation: fromLocation[fromLocationIndex],
        toLocation: toLocation[toLocationIndex],
        departureDate: departureDate[departureDateIndex],
        arrivalDate: arrivalDate[arrivalDateIndex],
        childTransportFare: childTransportFare[childTransportFareIndex],
        adultTransportFare: adultTransportFare[adultTransportFareIndex],
        availableSeats,
        bookedSeats,
        bus: buses[busIndex],
      };
      const newTripSchedule = new TripSchedule(tripSchedule);
      await newTripSchedule.save();
    }
  });
  console.log("Seeds to db completed successfully!");
}

async function seed() {
  await seedTripSchedule();
}

seed();
