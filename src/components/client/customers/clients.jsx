import React, { Component } from "react";
import Client from "./client";

class Clients extends Component {
  state = {
    agency: null
  };

  componentWillMount() {
    let agency = this.props.agency;
    this.setState({ agency: agency });
  }
  render() {
    var { agency } = this.state;
    var items = agency.clients;
    if (items)
      return (
        <div>
          {items.map(item => (
            <Client
              key={item.id}
              agency={agency}
              client={item}
              onLoad={this.props.onLoad}
            />
          ))}
        </div>
      );
  }
}

export default Clients;
