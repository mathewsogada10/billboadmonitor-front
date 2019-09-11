import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BrandBoardForm from "./forms/brandBoardForm";
import ImageForm from "./forms/imageForm";
import CompetitorForm from "./forms/competitorForm";
import history from "./../../history";
import { Link } from "react-router-dom";

class ManageBillBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ""
    };
  }
  clickToMain = () => {
    history.push("/admin");
  };

  setBoard = () => {
    let brd = this.props.location.state.board;
    this.setState({
      board: brd
    });
  };

  componentWillMount() {
    this.setBoard();
  }

  render() {
    var { board } = this.state;
    //console.log("board  passed:" + board.id);
    return (
      <div>
        <div>
          <nav className="navbar navbar-light bg-dark">
            <p style={{ color: "yellow" }}>
              Manage BillBoard ({board.id} - {board.type} - {board.owner})
            </p>
            <Link to="/admin" style={{ color: "yellow" }}>
              Back to main
            </Link>
          </nav>
        </div>
        <div>
          <Tabs defaultActiveKey="edit" id="uncontrolled-tab-example">
            <Tab eventKey="edit" title="Edit BillBoard">
              Editing form to go here
            </Tab>
            <Tab eventKey="brand" title="Add Brand">
              <BrandBoardForm board={board} />
            </Tab>
            <Tab eventKey="image" title="Attach Image">
              <ImageForm board={board} />
            </Tab>
            <Tab eventKey="competitor" title="Add Competitor">
              <CompetitorForm board={board} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ManageBillBoard;
