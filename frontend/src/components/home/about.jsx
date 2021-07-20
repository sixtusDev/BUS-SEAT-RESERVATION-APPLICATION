import React from "react";
import { Container, Heading, Text, Center } from "@chakra-ui/react";

const About = () => {
  return (
    <Container
      maxW="container.lg"
      mt={{ base: "80", sm: "80", md: "28" }}
      lineHeight="2"
      id="about"
    >
      <Center>
        <Heading mb="4" textTransform="uppercase">
          About Us
        </Heading>
      </Center>
      <Text fontSize="md" textAlign="center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        velit alias porro rerum expedita obcaecati laudantium odit atque quod
        natus facere vel nesciunt, fuga id quos inventore earum dolorum
        molestiae delectus at commodi temporibus voluptates provident quam! Sunt
        illo blanditiis dignissimos? Nesciunt, aliquid quod pariatur provident,
        et blanditiis animi sunt, ex at eaque magnam architecto illum fuga
        ipsum! Recusandae dolore debitis quia officia laudantium necessitatibus
        quod eos natus, fuga dolorum similique officiis modi nihil id molestias
        animi impedit mollitia amet ipsa exercitationem suscipit? Iusto cum iste
        tempora odit laboriosam ad id illum tenetur magni et adipisci quos nam,
        nulla natus!
      </Text>
    </Container>
  );
};

export default About;
