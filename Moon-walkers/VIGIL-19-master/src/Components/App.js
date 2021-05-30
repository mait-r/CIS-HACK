import React from "react";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import firebaseConfig from "../firebaseConfig";
import addNotification, { Notifications } from "react-push-notification";
import "./Not.css";
import Sidebar from "./Sidebar";
import DmrcNotification from "./DmrcNotification";
import DtcNotification from "./DtcNotification";
import NdmcNotification from "./NdmcNotification";
import Home from "./Home";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.database = firebaseConfig.database().ref().child("Stream");
    this.count = 0;
    this.state = {
      dmrc: [],
      dtc: [],
      ndmc: [],
      prevData: {},
    };
  }
  componentDidMount() {
    this.database.once("value", (snap) => {
      this.setState({
        prevData: snap.val(),
      });
    });

    this.props.history.push("/home");
    var RFID = {};

    var i = 0;
    this.database.on("value", (snap) => {
      if (i !== 0) {
        console.log(snap.val());
        let RFID = {};
        RFID.ID = snap.val().data1.CardUid;
        if (snap.val().data1["health-status"] === 2) {
          RFID.isInfected = true;
          RFID.isQuarantined = true;
        } else if (snap.val().data1["health-status"] === 1) {
          RFID.isInfected = false;
          RFID.isQuarantined = true;
        } else if (snap.val().data1["health-status"] === 0) {
          RFID.isInfected = false;
          RFID.isQuarantined = false;
        }
        if (snap.val().data1.type === 0) {
          if (snap.val().data1["health-status"] !== 0) {
            var a = this.state.dmrc;
            a.unshift(RFID);
            addNotification({
              title: `${RFID.isInfected === true ? "Danger" : "Alert"}`,
              subtitle: `${
                RFID.isInfected === true ? "Infected" : "Quarantined"
              }`,
              message: `${
                RFID.isInfected === true
                  ? "Infected Person Spotted"
                  : "Quarantined Person Spotted"
              }`,
              theme: `${RFID.isInfected === true ? "red" : "darkblue"}`,
              native: false, // when using native, your OS will handle theming.
            });
            this.setState({ dmrc: a }, () => {
              this.count = 0;
            });
          }
        } else if (snap.val().data1.type === 1) {
          if (snap.val().data1["health-status"] !== 0) {
            var b = this.state.dtc;
            b.unshift(RFID);
            addNotification({
              title: `${RFID.isInfected === true ? "Danger" : "Alert"}`,
              subtitle: `${
                RFID.isInfected === true ? "Infected" : "Quarantined"
              }`,
              message: `${
                RFID.isInfected === true
                  ? "Infected Person Spotted"
                  : "Quarantined Person Spotted"
              }`,
              theme: `${RFID.isInfected === true ? "red" : "darkblue"}`,
              native: false, // when using native, your OS will handle theming.
            });
            this.setState(
              {
                dtc: b,
              },
              () => {
                this.count = 0;
              }
            );
          }
        } else if (snap.val().data1.type === 2) {
          if (snap.val().data1["health-status"] !== 0) {
            var c = this.state.ndmc;
            c.unshift(RFID);
            addNotification({
              title: `${RFID.isInfected === true ? "Danger" : "Alert"}`,
              subtitle: `${
                RFID.isInfected === true ? "Infected" : "Quarantined"
              }`,
              message: `${
                RFID.isInfected === true
                  ? "Infected Person Spotted"
                  : "Quarantined Person Spotted"
              }`,
              theme: `${RFID.isInfected === true ? "red" : "darkblue"}`,
              native: false, // when using native, your OS will handle theming.
            });
            this.setState(
              {
                ndmc: c,
              },
              () => {
                this.count = 0;
              }
            );
          }
        }
      } else {
        i = i + 1;
      }
    });
  }
  render() {
    return (
      <div class="wrapper d-flex align-items-stretch">
        <Sidebar />
        <Switch>
          <Route path="/home" exact render={(props) => <Home />} />
          <Route
            path="/dmrc"
            exact
            render={(props) => (
              <DmrcNotification Notifications={this.state.dmrc} />
            )}
          />
          <Route
            path="/dtc"
            exact
            render={(props) => (
              <DtcNotification Notifications={this.state.dtc} />
            )}
          />
          <Route
            path="/ndmc"
            exact
            render={(props) => (
              <NdmcNotification Notifications={this.state.ndmc} />
            )}
          />
        </Switch>
        <Notifications />
      </div>
    );
  }
}

export default withRouter(App);
