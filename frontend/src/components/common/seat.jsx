// Import Statements
import React, { Component } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import "./seat.css";

class Seat extends Component {
  render() {
    const { bookedSeats, selectedSeats, onSelectSeat } = this.props;
    const btnClassName = (number) => {
      if (bookedSeats[number]) return `seat booked`;
      else if (selectedSeats[number]) return `seat selected`;
      else return `seat available`;
    };
    return (
      <React.Fragment>
        <Box
          position={{ base: "static", md: "relative" }}
          display={{ base: "flex", md: "block" }}
          flexWrap="wrap"
          maxW={{ base: "sm", md: "2xl" }}
          ml="auto"
          mr="auto"
        >
          <Image
            src="/seat.jpg"
            alt="seat"
            display={{ base: "none", md: "block" }}
          />
          <Box
            as="span"
            left="156px"
            top="107px"
            className={btnClassName(1)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            1
          </Box>
          <Box
            as="span"
            left="156px"
            top="144px"
            className={btnClassName(2)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            2
          </Box>
          <Box
            as="span"
            left="156px"
            top="225px"
            className={btnClassName(3)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            3
          </Box>
          <Box
            as="span"
            left="156px"
            top="263px"
            className={btnClassName(4)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            4
          </Box>
          <Box
            as="span"
            left="217px"
            top="107px"
            className={btnClassName(5)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            5
          </Box>
          <Box
            as="span"
            left="217px"
            top="145px"
            className={btnClassName(6)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            6
          </Box>
          <Box
            as="span"
            left="225px"
            top="226px"
            className={btnClassName(7)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            7
          </Box>
          <Box
            as="span"
            left="225px"
            top="263px"
            className={btnClassName(8)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            8
          </Box>
          <Box
            as="span"
            left="282px"
            top="107px"
            className={btnClassName(9)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            9
          </Box>
          <Box
            as="span"
            left="282px"
            top="145px"
            className={btnClassName(10)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            10
          </Box>
          <Box
            as="span"
            left="294px"
            top="226px"
            className={btnClassName(11)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            11
          </Box>
          <Box
            as="span"
            left="294px"
            top="263px"
            className={btnClassName(12)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            12
          </Box>
          <Box
            as="span"
            left="363px"
            top="226px"
            className={btnClassName(13)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            13
          </Box>
          <Box
            as="span"
            left="363px"
            top="263px"
            className={btnClassName(14)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            14
          </Box>
          <Box
            as="span"
            left="432px"
            top="226px"
            className={btnClassName(15)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            15
          </Box>
          <Box
            as="span"
            left="432px"
            top="263px"
            className={btnClassName(16)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            16
          </Box>
          <Box
            as="span"
            left="448px"
            top="107px"
            className={btnClassName(17)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            17
          </Box>
          <Box
            as="span"
            left="449px"
            top="145px"
            className={btnClassName(18)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            18
          </Box>
          <Box
            as="span"
            left="511px"
            top="108px"
            className={btnClassName(19)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            19
          </Box>
          <Box
            as="span"
            left="510px"
            top="146px"
            className={btnClassName(20)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            20
          </Box>
          <Box
            as="span"
            left="510px"
            top="188px"
            className={btnClassName(21)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            21
          </Box>
          <Box
            as="span"
            left="510px"
            top="225px"
            className={btnClassName(22)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            22
          </Box>
          <Box
            as="span"
            left="510px"
            top="263px"
            className={btnClassName(23)}
            onClick={(e) => onSelectSeat(e)}
            position={{ base: "static", md: "absolute" }}
            mr={{ base: "2", md: "0" }}
            ml={{ base: "2", md: "0" }}
            mb={{ base: "4", md: "0" }}
          >
            23
          </Box>
        </Box>
        <Box>
          <Flex
            justify="space-around"
            flexDir={{ base: "column", sm: "row" }}
            w="50%"
            m="auto"
            mb="16"
            align="center"
            mt="12"
          >
            <Flex flexDir="column" align="center">
              <Box className="booked" w="28" h="10"></Box>
              <Text textTransform="uppercase">Booked</Text>
            </Flex>
            <Flex flexDir="column" align="center">
              <Box className="available" w="28" h="10"></Box>
              <Text textTransform="uppercase">Available</Text>
            </Flex>
            <Flex flexDir="column" align="center">
              <Box className="selected" w="28" h="10"></Box>
              <Text textTransform="uppercase">Selected</Text>
            </Flex>
          </Flex>
        </Box>
      </React.Fragment>
    );
  }
}

export default Seat;
