// Import Statements
const NaijaStates = require("naija-state-local-government");

// These are data that helps us populate random number of
// different trip schedules dynamically in our database
exports.fromLocation = NaijaStates.states();
exports.toLocation = NaijaStates.states();
exports.departureDate = [
  "2021-07-30 6:00:00",
  "2021-07-30 8:00:00",
  "2021-07-30 10:00:00",
];
exports.arrivalDate = [
  "2021-07-30 12:00:00",
  "2021-07-30 14:00:00",
  "2021-07-30 16:00:00",
];
exports.childTransportFare = [10, 20, 30, 40, 50];
exports.adultTransportFare = [50, 60, 70, 80, 90];
exports.availableSeats = 23;
exports.bookedSeats = [];
