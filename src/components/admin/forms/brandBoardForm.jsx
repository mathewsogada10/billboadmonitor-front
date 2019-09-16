import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getBrand, baseUrl } from "../../utils/util";
import NativeSelect from "@material-ui/core/NativeSelect";
import Axios from "axios";

class BrandBoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      brandAgency: "",
      billboard: "",
      recommendation: ""
    };
  }

  submitHandler = async event => {
    event.preventDefault();
    let json = {
      brandAgency: this.state.brandAgency,
      billboard: this.state.billboard,
      recommendation: this.state.recommendation
    };
    try {
      let response = await Axios.post(baseUrl + "board/brand/create", json, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      let object = response.data;
      alert("BillBoard Brand saved => " + object.id + " - " + object.billboard);
    } catch (e) {
      alert("Whoops!! Save request failed!! Could be you lost connection" + e);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setBrands = async () => {
    let response = await getBrand();
    this.setState({ brands: response });
  };

  componentWillMount() {
    var brd = this.props.board.id;
    this.setState({ billboard: brd });
  }

  componentDidMount() {
    this.setBrands();
  }

  render() {
    var { brandAgency, billboard, recommendation, brands } = this.state;
    return (
      <div>
        <form
          className="form"
          noValidate
          autoComplete="on"
          style={{ backgroundColor: "white" }}
          onSubmit={event => {
            this.submitHandler(event);
          }}
        >
          <div>
            <div>Brand:</div>

            <NativeSelect
              id="txtBrand"
              label="Brand"
              name="brandAgency"
              value={brandAgency}
              onChange={this.changeHandler}
            >
              <option>Select Brand</option>
              {brands.map(brd => {
                return (
                  <option key={brd.id} value={brd.id}>
                    {brd.name}
                  </option>
                );
              })}
            </NativeSelect>
          </div>
          <div>
            <TextField
              id="txtBillboard"
              label="Bill board"
              name="billboard"
              margin="normal"
              value={billboard}
            />
          </div>
          <div>
            <TextField
              id="txtRecommendation"
              label="Recommendation"
              name="recommendation"
              margin="normal"
              value={recommendation}
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
      </div>
    );
  }
}

export default BrandBoardForm;
