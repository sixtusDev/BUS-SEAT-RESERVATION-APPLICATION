// Import Statements
import React from "react";
import NaijaStates from "naija-state-local-government";
import { Flex, Box, Container } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Reservation from "../reservation";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./hero.css";

class Hero extends Reservation {
  state = {
    startDate: Date.now(),
    data: {},
    errors: {},
  };
  render() {
    const states = NaijaStates.states();
    return (
      <div className="hero">
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          className="carousel"
        >
          <div>
            <img
              src="./bus1.jpg"
              alt="bus-1"
              className="hero__img"
              style={{
                backgroundColor: "#000",
              }}
            />
          </div>
          <div>
            <img src="./bus2.jpg" alt="bus-2" />
          </div>
          <div>
            <img src="./bus3.jpg" alt="bus-3" />
          </div>
        </Carousel>
        <Container
          maxW="xl"
          // w="100%"
          position="absolute"
          top={{ base: "165%", sm: "130%", md: "80%", lg: "90%", xl: "90%" }}
          left="50%"
          transform="translate(-50%, -50%)"
          bg="#fff"
          p="5"
          pb="0"
          opacity="1"
          zIndex="100"
        >
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
        </Container>
      </div>
    );
  }
}

export default withRouter(Hero);
