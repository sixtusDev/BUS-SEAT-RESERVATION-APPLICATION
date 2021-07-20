// Import statements
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Box,
  Stack,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HashLink } from "react-router-hash-link";
import Login from "../login";
import Register from "../register";
import "./nav.css";

const Nav = ({ user }) => {
  // Chackra userDisclosure provider
  const { isOpen, onOpen, onClose } = useDisclosure();

  // This helps in using multiple modals in thesame components
  // by renaming: isOpen, onOpen, onClose that is being distructured
  const {
    isOpen: isOpenAuthModal,
    onOpen: onOpenAuthModal,
    onClose: onCloseAuthModal,
  } = useDisclosure();

  const [authType, setAuthType] = useState("");
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  // This function dynamically renders the login and register
  // component in the Chakra modal
  const handleOpenModal = ({ currentTarget }) => {
    currentTarget.id === "login"
      ? setAuthType("login")
      : setAuthType("register");
    onOpenAuthModal();
  };
  return (
    <nav>
      <Modal isOpen={isOpenAuthModal} onClose={onCloseAuthModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {authType === "login" ? <Login /> : <Register />}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        bg="black"
        pl="6"
        pr="6"
        color="white"
        mb="10"
      >
        <Flex align="center" mr={5}>
          <Link to="/">
            <Image
              src="/logo.png"
              alt="Logo"
              className="logo"
              w={{ base: "14", sm: "20", md: "24" }}
            />
          </Link>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <HamburgerIcon />
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          textAlign="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <Box>
            <HashLink smooth to="/#top" style={{ marginRight: "5px" }}>
              Home
            </HashLink>
          </Box>
          <Box>
            <Link to="/reservation">Reservation</Link>
          </Box>
          <Box>
            <HashLink smooth to="/#about">
              About Us
            </HashLink>
          </Box>
          <Box>
            <HashLink smooth to="/#services">
              Services
            </HashLink>
          </Box>
        </Stack>

        <Flex
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          m="auto"
          textAlign="center"
          mt={{ base: "10", md: "auto" }}
          pb={{ base: "10", md: "0" }}
        >
          {!user && (
            <Button
              id="login"
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              mr="5"
              onClick={handleOpenModal}
            >
              Login
            </Button>
          )}
          {!user && (
            <Button
              id="register"
              variant="outline"
              _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              onClick={handleOpenModal}
            >
              Create account
            </Button>
          )}
          {user && (
            <Text display="inline-block" textTransform="uppercase" mr="5">
              Hello {user.firstName}
            </Text>
          )}
          {user && (
            <Link to="/logout">
              <Button
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
              >
                Logout
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Nav;
