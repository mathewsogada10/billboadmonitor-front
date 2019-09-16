import React, { Component } from "react";
import MediaAgencies from "./agencies/mediaAgencies";
import { Route } from "react-router-dom";
import Login from "../login/login";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClientBillBoard from "./clientBillBoards";
import GoogleLayer from "./googleLayer";
import BoardImage from "./boardImages";
import { baseUrl } from "../utils/util";
import Axios from "axios";

class Main extends Component {
  state = { boards: [], client: null, agency: null, brands: [] };

  loadBoards = async (boards, client, agency) => {
    let data = await this.fetchBrands(client, agency);
    try {
      if (!boards) {
        this.setState({
          boards: [],
          client: client,
          agency: agency,
          brands: data
        });
      } else {
        this.setState({
          boards: boards,
          client: client,
          agency: agency,
          brands: data
        });
      }
    } catch (e) {
      console.log("empty billboards");
    }
  };

  fetchBrands = async (client, agency) => {
    let data = [];
    if (client)
      try {
        let response = await Axios.get(
          baseUrl +
            "board/brand/all?client=" +
            client.id +
            "&agency=" +
            agency.id
        );
        data = response.data;
        //this.setState({ brands: data });
      } catch (e) {
        console.log("Whoops! Lis of brands could not be loaded" + e);
      }
    return data;
  };

  render() {
    var { isAuthenticated, userAgency } = this.props;
    var { boards, client, agency, brands } = this.state;
    console.log("brands at main" + brands);
    return (
      <div>
        {!isAuthenticated ? (
          <Route path="/" component={Login} />
        ) : (
          <div className="background-image" style={this.bgstyle}>
            <div className="row is-flex">
              <div
                className="col-md-2"
                style={{ backgroundColor: "green", height: "100vh" }}
              >
                <MediaAgencies onLoad={this.loadBoards} userAgency={userAgency} />
              </div>
              <div className="col-md-10">
                <div>
                  <nav className="navbar navbar-light bg-light">
                    MAIN PAGE CONTENT
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
                      <BoardImage
                        client={client}
                        agency={agency}
                        brands={brands}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Main;
