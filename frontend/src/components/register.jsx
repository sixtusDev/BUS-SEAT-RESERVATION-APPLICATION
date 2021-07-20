// Import Statements
import React from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex, Stack } from "@chakra-ui/react";
import Form from "./common/form";
import { saveUser } from "../services/userService";
import { setToken } from "../services/authService";

class Register extends Form {
  style = {
    borderRadius: "3px",
    width: "100%",
  };

  state = {
    data: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  };

  // This function calls the api for signing up a new user
  doSubmit = async (e) => {
    // API call
    try {
      const response = await saveUser(this.state.data);
      setToken(response.headers["x-auth-token"]);
      this.props.tripId
        ? (window.location = `/reservation/tripschedule/${this.props.tripId}`)
        : (window.location = "/");
    } catch (ex) {
      const errorMessage = ex.response.data;
      if (typeof errorMessage === "string") return toast.error(errorMessage);
      this.setState({ errors: errorMessage });
    }
  };

  render() {
    return (
      <form style={this.style} onSubmit={this.handleSubmit}>
        <Flex bg="" p="8">
          <Stack spacing={5} w="100%">
            {this.renderInput("firstName", "First Name", "md", "#2C7A7B")}
            {this.renderInput("secondName", "Second Name", "md", "#2C7A7B")}
            {this.renderInput(
              "email",
              "youremail@example.com",
              "md",
              "#2C7A7B",
              "email"
            )}
            {this.renderInput(
              "password",
              "Password",
              "md",
              "#2C7A7B",
              "password"
            )}
            {this.renderInput(
              "confirmPassword",
              "Confirm Password",
              "md",
              "#2C7A7B",
              "password"
            )}
            {this.renderButton("SIGN UP", "teal", "outline", "submit")}
          </Stack>
        </Flex>
      </form>
    );
  }
}

// Export Statements
export default withRouter(Register);
