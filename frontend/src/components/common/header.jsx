// Import Statements
import React from "react";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Header = ({ heading, text }) => {
  return (
    <Box
      pt="28"
      pb={{ base: "12", md: "20" }}
      pl="5"
      pr="5"
      bg="black"
      color="white"
      mb="20"
      textAlign="center"
    >
      <Center>
        <Heading mb="10" fontSize={{ base: "20", md: "30", lg: "40" }}>
          {heading}
        </Heading>
      </Center>
      <Center>
        <Text fontSize={{ base: "sm", md: "xl", lg: "2xl" }}>{text}</Text>
      </Center>
    </Box>
  );
};

export default Header;
