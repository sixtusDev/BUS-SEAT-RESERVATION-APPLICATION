// Import Statements
import { Component } from "react";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { getToken } from "./services/authService";
import Nav from "./components/common/nav";
import Home from "./components/home/home";
import Reservation from "./components/reservation";
import Footer from "./components/common/footer";
import TripSchedule from "./components/tripSchedule";
import TripSchedules from "./components/tripSchedules";
import Logout from "./components/logout";
import About from "./components/home/about";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwtToken = getToken();
      const user = jwtDecode(jwtToken);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <Box>
        <Nav user={this.state.user} />
        <Switch>
          <Route exact path="/reservation" component={Reservation} />
          <Route
            exact
            path="/reservation/tripSchedules"
            render={(props) => (
              <TripSchedules user={this.state["user"]} {...props} />
            )}
          />
          <Route
            exact
            path="/reservation/tripschedule/:id"
            render={(props) => (
              <TripSchedule user={this.state.user} {...props} />
            )}
          />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
        <ToastContainer style={{ fontSize: "1.3rem" }} />
      </Box>
    );
  }
}

export default App;
