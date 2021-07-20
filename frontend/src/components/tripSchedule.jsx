import React from "react";
import { Text, Container, Box, Flex, Button } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import ResevationTable from "./common/table";
import Seat from "./common/seat";
import Form from "./common/form";
import Header from "./common/header";
import { getTripSchedule } from "../services/tripSchedulesService";
import { saveTicket } from "../services/ticket";
import {
  numberToArray,
  objectKeysToArray,
  objectValuesToArray,
  paymentGateway,
} from "../utils/helperFunctions";
import { bookSchema } from "../utils/schema";

const FluterWaveButtonWithRouter = withRouter(FlutterWaveButton);

class TripSchedule extends Form {
  state = {
    tripSchedule: null,
    bookedSeats: {},
    selectedSeats: {},
    availableSeats: null, // holds the state for the available space for passengers. Type => Number
    childAvailableSeats: null,
    adultAvailableSeats: null,
    passengersCount: null,
    childCount: 0,
    adultCount: 0,
    totalAmount: 0,
    passengersName: {},
    data: {},
    errors: {},
  };

  async componentDidMount() {
    // API call to fetch tripSchedule by ID
    const { data: tripSchedule } = await getTripSchedule(
      this.props.match.params.id
    );
    const bookedSeats = {};
    // Converts the booked seats from an array to an object
    // Array: ["1","4","5","9"] => {1: "1", 4: 4, 5: "5", 9: "9"}
    tripSchedule.bookedSeats.forEach((seat) => {
      bookedSeats[seat] = seat;
    });

    // converts the total seats to an array:
    // 23 => ["1","2","3", ..., "23"]
    const seatsInArray = numberToArray(tripSchedule.bus.totalSeats, "string");

    // Filters the booked seat from the total seat and then
    // returns the available seats
    const { length: availableSeats } = seatsInArray.filter(
      (seat) => seat !== bookedSeats[seat]
    );
    this.setState({
      tripSchedule,
      bookedSeats,
      availableSeats: availableSeats,
      childAvailableSeats: availableSeats,
      adultAvailableSeats: availableSeats,
    });
  }

  // Handles the functionality of selecting seat number
  handleSelectSeat = ({ currentTarget }) => {
    const { selectedSeats, adultCount, childCount } = this.state;
    // Gets the number of seat from the DOM innerText
    const seatNumber = currentTarget.innerText;
    const selectedSeatsCopy = selectedSeats;

    // Conditional statememnt handling the logic in selecting seat number
    if (
      objectKeysToArray(selectedSeats).length === adultCount + childCount &&
      currentTarget.className.includes("selected")
    ) {
      delete selectedSeatsCopy[seatNumber];
      return this.setState({ selectedSeats: selectedSeatsCopy });
    } else if (selectedSeatsCopy[seatNumber]) {
      delete selectedSeatsCopy[seatNumber];
      this.setState({ selectedSeats: selectedSeatsCopy });
    } else if (
      objectKeysToArray(selectedSeats).length !==
      adultCount + childCount
    ) {
      selectedSeatsCopy[seatNumber] = seatNumber;
      this.setState({ selectedSeats: selectedSeatsCopy });
    }
  };

  // Handles the functionality of selecting the quantity of passengers
  handleSelectPassenger = ({ currentTarget }) => {
    const { value, id } = currentTarget;
    const { availableSeats, childCount, adultCount } = this.state;
    if (id === "child")
      return this.setState({
        childCount: parseInt(value),
        adultAvailableSeats: availableSeats - parseInt(value),
        childAvailableSeats: Math.abs(availableSeats - parseInt(adultCount)),
      });
    return this.setState({
      adultCount: parseInt(value),
      childAvailableSeats: availableSeats - parseInt(value),
      adultAvailableSeats: Math.abs(availableSeats - parseInt(childCount)),
    });
  };

  // This function handles the name of passengers that is being typed
  // in the input el of the UI and then sets the value to the passenger
  // name state
  handlePassengerNameInput = ({ currentTarget }) => {
    const { passengersName } = this.state;
    const passengersNameCopy = { ...passengersName };
    passengersNameCopy[currentTarget.name] = currentTarget.value;
    this.setState({ passengersName: passengersNameCopy });
  };

  // This function handles tho book ticket logic by communicating
  // to the server
  doSubmit = async () => {
    const { selectedSeats, childCount, adultCount } = this.state;
    if ((childCount === 0) & (adultCount === 0))
      return toast.error("Please select number of child or adult passengers");
    if (objectKeysToArray(selectedSeats).length !== childCount + adultCount)
      return toast.error("Please select seat number for all passengers");
    const errors = this.validate(bookSchema(childCount, adultCount));
    this.setState({ errors: errors || {} });
    if (errors) return;
  };

  book = async (totalAmount) => {
    const { tripSchedule, selectedSeats, data } = this.state;
    const { user } = this.props;
    const busId = tripSchedule.bus._id;
    const userId = user._id;
    const tripScheduleId = tripSchedule._id;
    const departureDate = tripSchedule.departureDate;
    const arrivalDate = tripSchedule.arrivalDate;
    const passengers = data;
    const sits = objectValuesToArray(selectedSeats); // Object => Array
    try {
      const { data: ticket } = await saveTicket({
        busId,
        userId,
        sits,
        totalAmount,
        departureDate,
        arrivalDate,
        passengers,
        tripScheduleId,
      });
      console.log(ticket);
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  render() {
    const {
      tripSchedule,
      bookedSeats,
      selectedSeats,
      childAvailableSeats,
      adultAvailableSeats,
      childCount,
      adultCount,
    } = this.state;
    const { user } = this.props;
    let totalAmount;
    let fwConfig;
    if (user && tripSchedule) {
      totalAmount =
        childCount * tripSchedule.childTransportFare +
        adultCount * tripSchedule.adultTransportFare;
      fwConfig = {
        ...paymentGateway(
          totalAmount,
          user.email,
          user.firstName + " " + user.secondName
        ),
        text: "BOOK NOW",
        callback: (response) => {
          console.log(response);
          if (response.status !== "successful") {
            closePaymentModal();
            return toast.info("Payment not successful");
          }
          this.book(totalAmount);
          closePaymentModal(); // this will close the modal programmatically
          toast.success(
            "Reservation succefully completed. Please check your email for travels details and receipt of payment"
          );
          setTimeout(() => {
            window.location = "/";
          }, 6000);
        },
        onClose: () => {
          toast.info(
            `${user.firstName.toUpperCase()}, you just cancelled your payment process!`
          );
        },
      };
    }
    return (
      <div>
        <Header
          heading={
            tripSchedule &&
            tripSchedule.fromLocation.toUpperCase() +
              " TO " +
              tripSchedule.toLocation.toUpperCase()
          }
          text="Select seats number and book your ticket"
        />
        <Container maxW="container.xl" mb="40">
          <Text textAlign="center">
            Please select number of children/adult and book your ticket
          </Text>

          {tripSchedule && (
            <React.Fragment>
              <ResevationTable
                ticket={true}
                tripSchedules={[tripSchedule]}
                childAvailableSeats={childAvailableSeats}
                adultAvailableSeats={adultAvailableSeats}
                onSelectPassengers={this.handleSelectPassenger}
              />
              <Seat
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                onSelectSeat={this.handleSelectSeat}
              />
              <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
                <Flex
                  justify="space-between"
                  mb="9"
                  flexDir={{ base: "column", md: "row" }}
                >
                  {childCount ? (
                    <Box width={{ base: "100%", md: "45%" }}>
                      {numberToArray(childCount, "string").map((child) => (
                        <Box mb="4" key={child}>
                          {this.renderInput(
                            `child${child}`,
                            `Enter full name of Chid ${child}`,
                            null,
                            "#2C7A7B",
                            "text",
                            `Child ${child}`
                          )}
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    ""
                  )}
                  {adultCount ? (
                    <Box width={{ base: "100%", md: "45%" }}>
                      {numberToArray(adultCount, "string").map((adult) => (
                        <Box mb="4" key={adult}>
                          {this.renderInput(
                            `adult${adult}`,
                            `Enter full name of Adult ${adult}`,
                            null,
                            "#2C7A7B",
                            "text",
                            `Adult ${adult}`
                          )}
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    ""
                  )}
                </Flex>
                <Box textAlign="center">
                  {(childCount || adultCount) &&
                  objectKeysToArray(this.state.selectedSeats).length ===
                    adultCount + childCount &&
                  !objectValuesToArray(this.state.data).includes("") &&
                  objectKeysToArray(this.state.data).length ===
                    adultCount + childCount &&
                  objectKeysToArray(this.state.errors).length === 0 ? (
                    <Button as="div" colorScheme="teal" variant="solid">
                      <FluterWaveButtonWithRouter {...fwConfig} />
                    </Button>
                  ) : (
                    this.renderButton("BOOK NOW", "teal", "solid", "submit")
                  )}
                </Box>
              </form>
            </React.Fragment>
          )}
        </Container>
      </div>
    );
  }
}

export default TripSchedule;
