import React, { Component } from "react";
import { getBillBoards } from "./../utils/util";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../login/login";
import history from "../../history";

class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billBoards: []
    };
  }

  clickHandler = () => {
    history.push("/admin/Board/add");
  };

  clickManage = board => {
    history.push("/admin/Board/Manage", { board: board });
  };

  getBB = async () => {
    const response = await getBillBoards();
    this.setState({ billBoards: response });
  };

  componentDidMount() {
    this.getBB();
  }

  render() {
    var { isAuthenticated } = this.props;
    var { billBoards } = this.state;
    return (
      <BrowserRouter>
        {!isAuthenticated ? (
          <Route path="/" component={Login} />
        ) : (
          <div>
            <div className="text-left">
              <button onClick={this.clickHandler} className="btn btn-link">
                ADD
              </button>
            </div>
            <div>
              <table
                className="table table-dark table-sm"
                style={{ color: "White", fontWeight: "bold" }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Latittude</th>
                    <th>Longitude</th>
                    <th>Owner</th>
                    <th>State</th>
                    <th>Street</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billBoards.map(board => (
                    <tr key={board.id}>
                      <td>{board.id}</td>
                      <td>{board.description}</td>
                      <td>{board.type}</td>
                      <td>{board.latittude}</td>
                      <td>{board.longitude}</td>
                      <td>{board.owner}</td>
                      <td>{board.state}</td>
                      <td>{board.street}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-primary bt-sm"
                          onClickCapture={() => this.clickManage(board)}
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default AdminMain;
