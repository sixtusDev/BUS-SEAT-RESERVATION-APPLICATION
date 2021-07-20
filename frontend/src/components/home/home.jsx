import React, { Component } from "react";
import Hero from "./hero";
import About from "./about";
import Services from "./services";
import Faq from "./faq";
import Testimonials from "./testimonials";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
        <About />
        <Services />
        <Faq />
        <Testimonials />
      </div>
    );
  }
}

export default Home;
