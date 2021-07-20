// Import statements
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  Box,
  Container,
  Stack,
  Link,
  Text,
  Image,
  Center,
  Icon,
} from "@chakra-ui/react";
import "./footer.css";

const Footer = () => {
  return (
    <Box bg="black" color="teal.600" pt="20" pb="10" as="footer">
      <Container maxW="container.xl" textAlign="center">
        <Center>
          <Stack flex="1" spacing="4">
            <Box fontSize="lg">
              <Link mr="4">RESERVATION</Link>
              <Link>CONTACT US</Link>
            </Box>
            <Box fontSize="2xl">
              <Link mr="4">
                <Icon as={FaFacebook} />
              </Link>
              <Link mr="4">
                <Icon as={FaInstagram} />
              </Link>
              <Link mr="4">
                <Icon as={FaTwitter} />
              </Link>
              <Link>
                <Icon as={FaLinkedin} />
              </Link>
            </Box>
            <Center>
              <Image src="/logo.png" alt="Logo" className="logo" />
            </Center>
          </Stack>
        </Center>
        <Text mt="5">&copy; 2021 Bus Company | All Right Reserved</Text>
      </Container>
    </Box>
  );
};

export default Footer;
