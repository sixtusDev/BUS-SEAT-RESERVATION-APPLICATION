// Import Statements
import React, { Component } from "react";
import { removeToken } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    // Function call to remove jwt token from local Storage
    removeToken();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
