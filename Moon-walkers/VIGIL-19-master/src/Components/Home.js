import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
class Home extends Component {
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <img
          src={require("../banner.jpg")}
          style={{ height: "45%", width: "100%" }}
        ></img>
        <Jumbotron style={{ marginBottom: "0" }}>
          <h2 style={{ lineHeight: "1.2" }}>
            <i>
              Protect People at Public places from COVID-19 and prevent further
              Spread
            </i>
          </h2>
          <p style={{ padding: "0.4rem 0" }}>
            Our solution will provide efficient system to ensure social
            distancing and track the spread of disease effectively. The system
            is specifically designed for the Indian societal and communal
            structure.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}
export default Home;
