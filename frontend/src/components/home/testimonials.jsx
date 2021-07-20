import React from "react";
import { Container, Heading, Box, Text, Center, Icon } from "@chakra-ui/react";
import { FaQuoteLeft } from "react-icons/fa";
import Carousel from "react-elastic-carousel";
import "./testimonials.css";

const Testimonials = () => {
  const items = [
    { id: 1, name: "Ishack Gayus" },
    { id: 2, name: "Sixtus Innocent" },
    { id: 3, name: "George Kushi" },
    { id: 4, name: "Richard Donatus" },
  ];
  return (
    <Container maxW="container.md" mb="40">
      <Center>
        <Heading mb="12">TESTIMONIALS</Heading>
      </Center>
      <Carousel itemsToShow={1}>
        {items.map((item) => (
          <Box key={item.id} lineHeight="1.5">
            <Center>
              <Icon as={FaQuoteLeft} color="teal.600" fontSize="8xl" mb="10" />
            </Center>
            <Text fontSize="xl" color="grey" mb="8" textAlign="center">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Explicabo reiciendis pariatur quo consequatur, odit eligendi
              excepturi alias quasi delectus sint tempora quia expedita sequi,
              eaque nemo optio cum recusandae inventore.
            </Text>
            <Center>
              <Text fontWeight="700">{item.name}</Text>
            </Center>
          </Box>
        ))}
      </Carousel>
    </Container>
  );
};

export default Testimonials;
