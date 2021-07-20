import React from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

const Faq = () => {
  return (
    <Box bg="#F8F8F8" mb="40" pt="20" pb="20" lineHeight="2">
      <Container maxW="container.lg">
        <Center>
          <Heading mb="4">FAQ</Heading>
        </Center>
        <Center>
          <Text mb="6">Here are what some frequentky asked question</Text>
        </Center>
        <Flex flexDir={{ base: "column", md: "row" }}>
          <Box
            borderWidth="1px"
            p="6"
            mr="6"
            w={{ base: "100%", md: "50%" }}
            mb={{ base: "7", md: "0" }}
          >
            <Center>
              {<QuestionIcon color="teal.600" fontSize="8xl" mb="8" />}
            </Center>
            <Center>
              <Heading as="h4" size="md" mb="5" fontWeight="400">
                CAN I GET A REFUND IF I MISS MY RESERVATION?
              </Heading>
            </Center>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium id sed aperiam tempora vitae dicta magni autem
              voluptate itaque ipsa blanditiis doloribus officiis maiores,
              mollitia explicabo repellat velit soluta ex.
            </Text>
          </Box>
          <Box borderWidth="1px" p="6" w={{ base: "100%", md: "50%" }}>
            <Center>
              {<QuestionIcon color="teal.600" fontSize="8xl" mb="8" />}
            </Center>
            <Center>
              <Heading as="h4" size="md" mb="5" fontWeight="400">
                WHAT HAPPENS IF I MISS MY BUS
              </Heading>
            </Center>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium id sed aperiam tempora vitae dicta magni autem
              voluptate itaque ipsa blanditiis doloribus officiis maiores,
              mollitia explicabo repellat velit soluta ex.
            </Text>
          </Box>
        </Flex>
        <Center>
          <Button
            size="lg"
            mt="8"
            colorScheme="teal"
            variant="solid"
            className="button"
            p={[4, 8]}
          >
            READ FAQ
          </Button>
        </Center>
      </Container>
    </Box>
  );
};

export default Faq;
