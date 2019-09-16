import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import Axios from "axios";
import { baseUrl } from "../../utils/util";
import Axios from "axios";

class CompetitorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      distance: "",
      avInShops: "",
      board: ""
    };
  }

  submitHandler = async event => {
    event.preventDefault();
    try {
      let json = {
        name: this.state.name,
        description: this.state.description,
        distance: this.state.distance,
        avInShops: this.state.avInShops,
        board: this.state.board
      };
      let response = await Axios.post(
        baseUrl + "board/competition/create",
        json,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      let object = response.data;
      if (object.id > 0) {
        alert(
          "competitor saved => " +
            object.id +
            " - " +
            object.name +
            " - " +
            object.description
        );
      }
    } catch (e) {
      alert("Whoops!! Save request failed!! Could be you lost connection" + e);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillMount() {
    this.setState({ board: this.props.board.id });
  }

  render() {
    var { name, description, distance, avInShops, board } = this.state;
    return (
      <div>
        <form
          className="form"
          noValidate
          autoComplete="on"
          style={{ backgroundColor: "white" }}
          onSubmit={e => {
            this.submitHandler(e);
          }}
        >
          <div>
            <TextField
              id="txtName"
              label="Name"
              name="name"
              margin="normal"
              value={name}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <TextField
              id="txtDescription"
              label="Description"
              name="description"
              margin="normal"
              value={description}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <TextField
              id="txtDistance"
              label="Distance from the BillBoard (m)"
              name="distance"
              margin="normal"
              value={distance}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <TextField
              id="txtAvInShops"
              label="Available in shops"
              name="avInShops"
              margin="normal"
              value={avInShops}
              onChange={this.changeHandler}
            />
          </div>
          <div>
            <TextField
              id="txtBoard"
              label="BillBoard"
              name="board"
              value={board}
            />
          </div>
          <br />
          <div>
            <Button variant="outlined" color="primary" type="submit">
              Save
            </Button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

export default CompetitorForm;
