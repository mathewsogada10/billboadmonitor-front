import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { baseUrl } from "../../utils/util";
import history from "../../../history";
import Select from "react-select";
//import { TextField } from "react-textfield";
//import {  withScriptjs,  withGoogleMap,  GoogleMap,  Marker} from "react-google-maps";

class BoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      boardType: "",
      owner: "",
      owners: [],
      latittude: 0.0,
      longitude: 0.0,
      state: "",
      street: ""
    };
  }

  submitHandler = async () => {
    let json = {
      description: this.state.description,
      boardType: this.state.boardType.value,
      owner: this.state.owner.value,
      latittude: this.state.latittude,
      longitude: this.state.longitude,
      state: this.state.state.value,
      street: this.state.street
    };
    console.log("BOARD JSON PASSED:" + JSON.stringify(json));
    try {
      let response = await Axios.post(baseUrl + "bill/board/create", json, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      let object = response.data;
      console.log("object json" + object);
      if (object.id > 0) {
        alert(
          "BillBoard saved => " +
            object.id +
            " - " +
            object.owner +
            " - " +
            object.street
        );
        this.setState({
          description: "",
          type: "",
          owners: [],
          owner: "",
          latittude: 0.0,
          longitude: 0.0,
          state: "",
          street: ""
        });
      }
    } catch (e) {
      alert("Whoops!! Save request failed!! Could be you lost connection" + e);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState({
          latittude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  };

  componentDidMount() {
    this.getGeoLocation();
    this.loadSuppliers();
  }

  clickHandler = () => {
    history.push("/admin");
  };

  loadSuppliers = async () => {
    try {
      let response = await Axios.get(baseUrl + "board/suppliers/all");
      this.setState({ owners: response.data });
    } catch (e) {
      console.log("iko shida: " + e);
    }
  };

  renderSuppliers = () => {
    return this.state.owners.map(data => ({
      label: data.name,
      value: data.name
    }));
  };

  renderState = () => {
    return [
      {
        label: "Good",
        value: "Good"
      },
      {
        label: "Vandalized",
        value: "Vandalized"
      },
      {
        label: "Missing",
        value: "Missing"
      },
      { label: "Obstructed", value: "Obstructed" }
    ];
  };

  renderType = () => {
    return [
      {
        label: "Large",
        value: "Large"
      },
      {
        label: "Screen",
        value: "Screen"
      },
      {
        label: "Small",
        value: "Small"
      },
      {
        label: "Medium",
        value: "Medium"
      }
    ];
  };

  handleSupplierChange = owner => {
    this.setState({ owner });
  };

  handleTypeChange = boardType => {
    this.setState({ boardType });
  };

  handleStateChange = state => {
    this.setState({ state });
  };

  render() {
    var {
      description,
      boardType,
      owner,
      latittude,
      longitude,
      state,
      street
    } = this.state;

    return (
      <div>
        <form
          className="form"
          validate="true"
          autoComplete="on"
          style={{ backgroundColor: "white" }}
          onSubmit={this.submitHandler}
        >
          <div>
            <TextField
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div>
            <Select
              label="Type"
              value={boardType}
              onChange={this.handleTypeChange}
              placeholder="Select Type"
              options={this.renderType()}
            />
          </div>
          <div>
            <Select
              label="Owner"
              value={owner}
              onChange={this.handleSupplierChange}
              placeholder="Select Owner"
              options={this.renderSuppliers()}
            />
          </div>
          <div>
            <TextField
              id="txtLatittude"
              label="Latittude"
              name="latittude"
              margin="normal"
              value={latittude}
              onChange={this.changeHandler}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div>
            <TextField
              id="txtLongitude"
              label="Longitude"
              name="longitude"
              margin="normal"
              value={longitude}
              onChange={this.changeHandler}
              InputProps={{
                readOnly: true
              }}
            />
          </div>
          <div>
            <Select
              label="State"
              name="state"
              value={state}
              onChange={this.handleStateChange}
              placeholder="Select state"
              options={this.renderState()}
            />
          </div>
          <div>
            <TextField
              id="txtStreet"
              label="Street"
              name="street"
              margin="normal"
              value={street}
              onChange={this.changeHandler}
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
        <div>
          <button
            onClick={this.clickHandler}
            className="btn btn-secondary bt-sm"
          >
            Go back to main page
          </button>
        </div>
      </div>
    );
  }
}

export default BoardForm;
