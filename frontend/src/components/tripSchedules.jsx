// Import Statements
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Text,
  Flex,
  Box,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import ReservationTable from "./common/table";
import Register from "./register";
import Header from "./common/header";
import Login from "./login";

const TripSchedules = ({ user, history }) => {
  // Using react hooks
  const [tripSchedules, setSchedules] = useState(history.location.state);
  const [authState, setAuthState] = useState("login");
  const [tripId, setTripId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Use effect
  useEffect(() => {
    async function fetchData() {
      // Get the tripschedules that is passed in the history object
      // when it was pushed in the reservation component
      const tripSchedules = history.location.state;
      setSchedules(tripSchedules); // Set to the tripSchedules state
    }
    fetchData();
  }, [history.location.state]);

  // Handles the auth state in order to dynamically render the
  // Login and Register component
  const handleToggleAuthState = () => {
    authState === "login" ? setAuthState("register") : setAuthState("login");
  };

  // This function opens auth model if the user is not logged
  // or registered
  function handleNavigateToTripSchedule(e) {
    if (user) {
      return history.push(`/reservation/tripschedule/${e.target.id}`);
    }
    onOpen();
    setTripId(e.target.id);
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {authState === "login" && (
              <React.Fragment>
                Don't have an account?
                <button onClick={handleToggleAuthState}>Create acount</button>
              </React.Fragment>
            )}
            {authState === "register" && (
              <React.Fragment>
                Already have an account?
                <button onClick={handleToggleAuthState}>Login</button>
              </React.Fragment>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {authState === "login" ? (
              <Login tripId={tripId} />
            ) : (
              <Register tripId={tripId} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Header
        heading="TRIP SCHEDULES"
        text="Select a trip and book your ticket"
      />
      <Container maxW="container.xl" mb="40">
        <Flex justify="space-around">
          <Text>
            Trip Schedules from{" "}
            <Box as="span" textTransform="capitalize">
              {tripSchedules[0].fromLocation}
            </Box>{" "}
            to{" "}
            <Box as="span" textTransform="capitalize">
              {tripSchedules[0].toLocation}
            </Box>
          </Text>
          <Text>
            Date of departure:{" "}
            {moment(tripSchedules[0].departureDate)
              .startOf("day")
              .format("DD-MM-YYYY")}
          </Text>
        </Flex>
        <ReservationTable
          tripSchedules={tripSchedules}
          onNavigateToTripSchedule={handleNavigateToTripSchedule}
        />
      </Container>
    </div>
  );
};

export default TripSchedules;
