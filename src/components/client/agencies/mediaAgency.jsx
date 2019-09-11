import React, { Component } from "react";
import Clients from "../customers/clients";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class MediaAgency extends Component {
  state = {};
  render() {
    var { agency } = this.props;
    // const dataT = "#" + agency.id;
    // console.log("Agent clients:" + agency.clients);
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {agency.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Clients agency={agency} onLoad={this.props.onLoad} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default MediaAgency;
