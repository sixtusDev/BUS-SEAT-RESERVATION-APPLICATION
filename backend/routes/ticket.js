// Import statements
const express = require("express");
const moment = require("moment");
const config = require("config");
const { Bus } = require("../model/Bus");
const { schema, Ticket } = require("../model/Ticket");
const { TripSchedule } = require("../model/TripSchedule");
const { User } = require("../model/User");
const { validate } = require("../utils/helperFunctions");
const { createTransport, createTestAccount } = require("nodemailer");

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
  tripSchedule.availableSeats = Math.abs(
    tripSchedule.availableSeats - sits.length
  );
  // Update the booked seats for trip schedule
  tripSchedule.bookedSeats = [...tripSchedule.bookedSeats, ...sits];
  await tripSchedule.save();
  await ticket.save();

  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: config.get("email"),
      pass: config.get("emailPassword"),
    },
  });

  const mailOptions = {
    from: '"NODE TRANSPORTATION" <harrietinnocent1@gmail.com>',
    to: "sixtusinno@gmail.com",
    subject: "YOUR BUS SEAT RESERVATION AND PAYMENT WAS SUCCESSFUL", // Subject line
    text: "Hello world?", // plain text body
    html: `<div>
                <h4>
                  You have successfully booked your ticket.
                  Thanks for your patronage. Below are the
                  the details of your travel ticket
                </h4>
                <h4>
                  Departure Date: ${moment(tripSchedule.departureDate)
                    .startOf("day")
                    .format("DD-MM-YYYY")}
                </h4>
                <h4>
                  Departure Time: ${moment(tripSchedule.departureDate).format(
                    "HH:mm A"
                  )}
                </h4>
                <h4>
                  Arrival Date: ${moment(tripSchedule.departureDate)
                    .startOf("day")
                    .format("DD-MM-YYYY")}
                </h4>
                <h4>
                  Arrival Time: ${moment(tripSchedule.arrivalDate).format(
                    "HH:mm A"
                  )}
                </h4>
                <h4>
                  Sits Number: ${sits.map((sit) => `<span>${sit}</span>`)}  
                </h4>
                <h4>Passengers:</h4>
                ${Object.keys(passengers).map(
                  (passenger) =>
                    `<p>${passenger} - ${passengers[passenger]}</p>`
                )}
                <h4>Amount: ${totalAmount} Naira</h4>
                <p>Note: Endearvour to be at the terminal 30 minutes
                  before departure time, because there is no refund on
                  missing your bus. Thanks.
                </p>
            </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Email Sent: ", +info);
  });

  res.send(ticket);
});

module.exports = router;
