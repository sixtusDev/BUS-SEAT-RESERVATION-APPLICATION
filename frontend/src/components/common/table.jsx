// Import Statements
import React from "react";
import moment from "moment";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { numberToArray } from "../../utils/helperFunctions";

const ResevationTable = ({
  ticket,
  tripSchedules,
  childAvailableSeats,
  adultAvailableSeats,
  onSelectPassengers,
  onNavigateToTripSchedule,
}) => {
  return (
    <Table mt="9">
      <Thead display={{ base: "none", lg: "table-header-group" }}>
        <Tr>
          <Th>BUS</Th>
          <Th>DEPARTURE TIME</Th>
          <Th>ARRIVAL TIME</Th>
          <Th>AVAILABLE SEATS</Th>
          <Th>AMOUNT</Th>
          {ticket && <Th>TICKET</Th>}
        </Tr>
      </Thead>
      <Tbody
        display={{ base: "block", lg: "table-row-group" }}
        mr="auto"
        ml="auto"
        w={{ base: "100%", sm: "90%", md: "80%", lg: "100%" }}
      >
        {tripSchedules.map((tripSchedule) => (
          <Tr
            key={tripSchedule._id}
            display={{ base: "flex", lg: "table-row" }}
            flexDir={{ base: "column" }}
            boxShadow={{ base: "lg", lg: "none" }}
            mb={{ base: "16", lg: "0" }}
          >
            {ticket ? (
              <Td
                textTransform="uppercase"
                display={{ base: "flex", lg: "table-cell" }}
                alignItems="center"
              >
                <Text
                  as="span"
                  display={{ base: "inline", lg: "none" }}
                  fontSize={{ base: "sm", md: "lg" }}
                  color="#000"
                  mr="auto"
                  w={{ base: "32", md: "48" }}
                >
                  BUS
                </Text>
                {tripSchedule.fromLocation} - {tripSchedule.toLocation}
              </Td>
            ) : (
              <Td
                onClick={onNavigateToTripSchedule}
                id={tripSchedule._id}
                color="teal.600"
                cursor="pointer"
                textTransform="uppercase"
                display={{ base: "flex", lg: "table-cell" }}
                alignItems="center"
              >
                <Text
                  as="span"
                  display={{ base: "inline", lg: "none" }}
                  fontSize={{ base: "sm", md: "lg" }}
                  color="#000"
                  mr="auto"
                  w={{ base: "32", md: "48" }}
                >
                  BUS
                </Text>{" "}
                <Text as="span" id={tripSchedule._id}>
                  {tripSchedule.fromLocation} - {tripSchedule.toLocation}
                </Text>
              </Td>
            )}
            <Td
              display={{ base: "flex", lg: "table-cell" }}
              alignItems="center"
            >
              <Text
                as="span"
                display={{ base: "inline", lg: "none" }}
                fontSize={{ base: "sm", md: "lg" }}
                color="#000"
                mr="auto"
                w={{ base: "32", md: "48" }}
              >
                DEPARTURE TIME
              </Text>
              <Text as="span">
                {moment(tripSchedule.departureDate)
                  .startOf("day")
                  .format("DD-MM-YYYY")}
                <br />
                {moment(tripSchedule.departureDate).format("HH:mm A")}
              </Text>
            </Td>
            <Td
              display={{ base: "flex", lg: "table-cell" }}
              alignItems="center"
            >
              <Text
                as="span"
                display={{ base: "inline", lg: "none" }}
                fontSize={{ base: "sm", md: "lg" }}
                color="#000"
                mr="auto"
                w={{ base: "32", md: "48" }}
              >
                ARRIVAL TIME
              </Text>
              <Text as="span">
                {moment(tripSchedule.arrivalDate)
                  .startOf("day")
                  .format("DD-MM-YYYY")}
                <br />
                {moment(tripSchedule.arrivalDate).format("HH:mm A")}
              </Text>
            </Td>
            <Td
              display={{ base: "flex", lg: "table-cell" }}
              alignItems="center"
            >
              <Text
                as="span"
                display={{ base: "inline", lg: "none" }}
                fontSize={{ base: "sm", md: "lg" }}
                color="#000"
                mr="auto"
                w={{ base: "32", md: "48" }}
              >
                AVAILABLE SEATS
              </Text>
              <Text as="span">{tripSchedule.availableSeats}</Text>
            </Td>
            <Td
              display={{ base: "flex", lg: "table-cell" }}
              alignItems="center"
            >
              <Text
                as="span"
                display={{ base: "inline", lg: "none" }}
                fontSize={{ base: "sm", md: "lg" }}
                color="#000"
                mr="auto"
                w={{ base: "32", md: "48" }}
              >
                AMOUNT
              </Text>
              <Text as="span">
                {tripSchedule && `Child: #${tripSchedule.childTransportFare}`}{" "}
                <br />{" "}
                {tripSchedule && `Adult: #${tripSchedule.adultTransportFare}`}
              </Text>
            </Td>
            {!ticket && (
              <Td
                display={{ base: "flex", lg: "none" }}
                alignSelf="center"
                onClick={onNavigateToTripSchedule}
              >
                <Button
                  id={tripSchedule._id}
                  variant="outline"
                  colorScheme="teal"
                >
                  BOOK
                </Button>
              </Td>
            )}
            {ticket && (
              <Td>
                Child
                <Select onChange={(e) => onSelectPassengers(e)} id="child">
                  <option value="0"></option>
                  {numberToArray(childAvailableSeats).map((passenger) => (
                    <option key={passenger} value={passenger}>
                      {passenger}
                    </option>
                  ))}
                </Select>
                <br />
                Adult
                <Select onChange={(e) => onSelectPassengers(e)} id="adult">
                  <option value="0"></option>
                  {numberToArray(adultAvailableSeats).map((passenger) => (
                    <option key={passenger} value={passenger}>
                      {passenger}
                    </option>
                  ))}
                </Select>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ResevationTable;
