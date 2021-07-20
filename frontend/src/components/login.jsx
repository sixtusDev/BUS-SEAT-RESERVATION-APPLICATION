// Import Statements
import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "./common/form";
import { signIn, setToken } from "../services/authService";

class Login extends Form {
  style = {
    borderRadius: "3px",
    width: "100%",
  };

  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  // This function calls the api for signing up a new user
  doSubmit = async () => {
    // API Call
    try {
      const { data: jwtToken } = await signIn(this.state.data);
      setToken(jwtToken); // function call to set jwt token to local storage
      this.props.tripId
        ? (window.location = `/reservation/tripschedule/${this.props.tripId}`)
        : (window.location = "/");
    } catch (ex) {
      if (ex.response) {
        const errorMessage = ex.response.data;
        if (typeof errorMessage === "string") return toast.error(errorMessage);
        this.setState({ errors: errorMessage });
      }
    }
  };

  render() {
    return (
      <form style={this.style} onSubmit={this.handleSubmit}>
        <Flex width="100%" bg="" p="8">
          <Stack spacing={5} w="100%">
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
            {this.renderButton("SIGN IN", "teal", "outline", "submit")}
          </Stack>
        </Flex>
      </form>
    );
  }
}

// Export Statements
// Higher Order Component (HOC) => withRouter is used
// to pass in the functionalities of react-router to login page
export default withRouter(Login);
