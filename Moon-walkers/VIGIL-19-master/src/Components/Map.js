import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class MapComp extends Component {
  render() {
    return (
      <div style={{ height: "50vh", width: "100%" }}>
        <Map
          google={this.props.google}
          style={{ width: "95%", height: "100%", position: "absolute" }}
          className={"map"}
          zoom={5}
          initialCenter={{
            lat: 21.0,
            lng: 77.0,
          }}
        >
          <Marker position={this.props.location} />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.MAPKEY,
})(MapComp);
