// Import Statements
import React from "react";
import NaijaStates from "naija-state-local-government";
import moment from "moment";
import { toast } from "react-toastify";
import { Box, Container, Flex } from "@chakra-ui/react";
import { getTripSchedulesByQueryString } from "../services/tripSchedulesService";
import Form from "./common/form";
import Header from "./common/header";
import { checkFormSchema } from "../utils/schema";
import "react-datepicker/dist/react-datepicker.css";
import "./reservation.css";

class Reservation extends Form {
  state = {
    startDate: new Date(),
    data: {
      from: "",
      to: "",
    },
    errors: {},
  };

  // This function calls the API for searching tripSchedules
  // with query Strings: from, to, and date
  doSubmit = async () => {
    let { data, startDate } = this.state;
    //Change the format of the date object
    startDate = moment(startDate).startOf("day").format("YYYY-MM-DD");
    const errors = this.validate(checkFormSchema);
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      const queryString = {
        ...data,
        date: startDate,
      };
      const { data: tripSchedules } = await getTripSchedulesByQueryString(
        queryString
      );
      console.log(tripSchedules);
      // Push to tripSchedules route and then pass the tripSchedules
      // as a state to be used in tripSchedules component
      this.props.history.push("/reservation/tripschedules", tripSchedules);
    } catch (ex) {
      if (ex.response) toast.info(ex.response.data);
    }
  };
  render() {
    const states = NaijaStates.states();

    return (
      <Box w="100%">
        <Header
          heading="RESERVATION"
          text="Choose your reservation and book your ticket"
        />
        <Box>
          <Container maxW="container.sm" mb="40">
            <form onSubmit={this.handleSubmit}>
              <Flex justify="space-between" mb="9">
                {this.renderSelect("from", states, "teal.600", "47%", "From")}
                {this.renderSelect("to", states, "teal.600", "47%", "To")}
              </Flex>
              <Flex
                align="center"
                justify="center"
                mb="20"
                flexDir={{ base: "column", sm: "row" }}
              >
                {this.renderDatePicker("dd/MM/yyyy", "date-picker")}
                <Box ml={{ base: "0", sm: "5" }} mt={{ base: "5", sm: "0" }}>
                  {this.renderButton(
                    "CHECK AVAILABILITY",
                    "teal",
                    "solid",
                    "submit"
                  )}
                </Box>
              </Flex>
            </form>
            <div></div>
          </Container>
        </Box>
      </Box>
    );
  }
}

export default Reservation;
