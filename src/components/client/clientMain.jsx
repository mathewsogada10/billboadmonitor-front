import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "../login/login";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClientBillBoard from "./clientBillBoards";
import GoogleLayer from "./googleLayer";
import BoardImage from "./boardImages";
import { baseUrl } from "../utils/util";
import Axios from "axios";
import decode from "jwt-decode";

class ClientMain extends Component {
  state = { client: null, brands: [] };

  fetchClient = async () => {
    var { userClient } = this.props;
    console.log(baseUrl + "media/client/" + userClient + "/");
    try {
      let response = await Axios.get(
        baseUrl + "media/client/" + userClient + "/"
      );
      this.setState({ client: response.data });
    } catch (e) {
      console.log("iko shida" + e);
    }
  };

  fetchBrands = async () => {
    var { userClient } = this.props;
    //let data = [];
    if (userClient)
      try {
        let response = await Axios.get(
          baseUrl + "board/brand/all?client=" + userClient
        );
        this.setState({ brands: response.data });
        // data = response.data;
      } catch (e) {
        console.log("Whoops! Lis of brands could not be loaded" + e);
      }
  };

  componentWillMount() {
    this.fetchClient();
    this.fetchBrands();
  }

  render() {
    var { isAuthenticated } = this.props;
    var { client, brands } = this.state;
    var boards;
    var clientName;
    if (client) {
      boards = client.boards;
      clientName = client.name;
    }
    let { username } = decode(localStorage.getItem("token"));
    return (
      <div>
        {!isAuthenticated ? (
          <Route path="/" component={Login} />
        ) : (
          <div>
            <div>
              <nav className="navbar navbar-light bg-dark text-light">
                {clientName}
                <span className="navbar-text" style={{ color: "green" }}>
                  {"Logged in as "} {username}
                </span>
              </nav>
            </div>
            <div>
              <Tabs defaultActiveKey="boards" id="uncontrolled-tab-example">
                <Tab eventKey="boards" title="BillBoards">
                  <ClientBillBoard boards={boards} brands={brands} />
                </Tab>
                <Tab eventKey="map" title="Google Map">
                  <GoogleLayer boards={boards} />
                </Tab>
                <Tab eventKey="image" title="BillBoard Images">
                  <BoardImage client={client} brands={brands} />
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ClientMain;
