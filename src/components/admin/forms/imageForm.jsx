import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { baseUrl } from "./../../utils/util";

class ImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      board: "",
      fileContent: null
    };
  }

  submitHandler = async e => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append(
        "fileContent",
        this.state.fileContent,
        this.state.fileContent.name
      );
      formData.append("board", this.state.board);
      formData.append("description", this.state.description);
      let response = await axios.post(
        baseUrl + "board/image/create",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-type": "multipart/form-data"
          }
        }
      );
      let object = response.data;
      alert("Image saved => " + object.id + " - " + object.description);
    } catch (er) {
      alert("Whoops!! Save request failed!! Could be you lost connection" + er);
    }
  };

  fileSelectHandler = e => {
    let fname = e.target.files[0].name;
    this.setState({ fileContent: e.target.files[0], description: fname });
  };

  componentWillMount() {
    var brd = this.props.board.id;
    this.setState({ board: brd });
  }

  render() {
    var { board } = this.state;

    return (
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
            id="txtBillboard"
            label="Bill Board"
            name="board"
            margin="normal"
            value={board}
          />
        </div>
        <div>
          <TextField
            id="txtFileContent"
            type="file"
            label="Attach File"
            onChange={this.fileSelectHandler}
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
    );
  }
}

export default ImageForm;
