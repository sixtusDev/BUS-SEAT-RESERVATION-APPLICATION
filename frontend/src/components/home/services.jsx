import React from "react";
import { Container, Box, Flex, Heading, Text, Center } from "@chakra-ui/react";
import { SettingsIcon, MoonIcon, RepeatIcon, StarIcon } from "@chakra-ui/icons";

const Services = () => {
  return (
    <Container maxW="container.xl" mt="40" mb="20" id="services">
      <Center>
        <Heading mb="8">SERVICES</Heading>
      </Center>
      <Flex
        justify="space-between"
        align="center"
        flexDir={{ base: "column", lg: "row" }}
        maxW={{ base: "md", lg: "inherit" }}
        margin="auto"
      >
        <Box
          borderWidth="1px"
          p="4"
          mr={{ base: "0", lg: "4" }}
          mb={{ base: "5", lg: "0" }}
        >
          <Center>
            {<SettingsIcon color="teal.600" fontSize="5xl" mb="4" />}
          </Center>
          <Center>
            <Heading as="h4" size="md" mb="5" fontWeight="400">
              SCALABILITY
            </Heading>
          </Center>
          <Text textAlign="center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            corporis magnam minus eveniet maiores blanditiis beatae sunt
            excepturi veniam perferendis?
          </Text>
        </Box>
        <Box
          borderWidth="1px"
          p="4"
          mr={{ base: "0", lg: "4" }}
          mb={{ base: "5", lg: "0" }}
        >
          <Center>{<MoonIcon color="teal.600" fontSize="5xl" mb="4" />}</Center>
          <Center>
            <Heading as="h4" size="md" mb="5" fontWeight="400">
              ENJOY COMFORT
            </Heading>
          </Center>
          <Text textAlign="center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            corporis magnam minus eveniet maiores blanditiis beatae sunt
            excepturi veniam perferendis?
          </Text>
        </Box>
        <Box
          borderWidth="1px"
          p="4"
          mr={{ base: "0", lg: "4" }}
          mb={{ base: "5", lg: "0" }}
        >
          <Center>
            {<RepeatIcon color="teal.600" fontSize="5xl" mb="4" />}
          </Center>
          <center>
            <Heading as="h4" size="md" mb="5" fontWeight="400">
              INTERSTATE TRAVEL
            </Heading>
          </center>
          <Text textAlign="center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            corporis magnam minus eveniet maiores blanditiis beatae sunt
            excepturi veniam perferendis?
          </Text>
        </Box>
        <Box borderWidth="1px" p="4">
          <Center>{<StarIcon color="teal.600" fontSize="5xl" mb="4" />}</Center>
          <Center>
            <Heading as="h4" size="md" mb="5" fontWeight="400">
              CUSTOMER SERVICE
            </Heading>
          </Center>
          <Text textAlign="center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
            corporis magnam minus eveniet maiores blanditiis beatae sunt
            excepturi veniam perferendis?
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Services;
