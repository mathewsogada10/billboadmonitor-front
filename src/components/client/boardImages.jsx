import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";
import { baseUrl } from "../utils/util";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import history from "../../history";
//import { PDFDownloadLink, Document, Page, View } from "@react-pdf/renderer";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];

class BoardImages extends Component {
  state = {
    brand: "",
    supplier: "",
    boardSuppliers: [],
    startDate: new Date(),
    endDate: new Date(),
    images: []
  };
  handleSupplierChange = supplier => {
    this.setState({ supplier });
    console.log(`Option selected:`, supplier);
  };

  handleBrandChange = brand => {
    this.setState({ brand });
    console.log(`Option selected:`, brand);
  };

  handleStartChange = date => {
    this.setState({
      startDate: date
    });
  };

  handlEndChange = date => {
    this.setState({
      endDate: date
    });
  };

  loadSuppliers = async () => {
    try {
      let response = await Axios.get(baseUrl + "board/suppliers/all");
      this.setState({ boardSuppliers: response.data });
    } catch (e) {
      console.log("iko shida: " + e);
    }
  };

  renderList = () => {
    return this.props.brands.map(data => ({
      label: data.name,
      value: data.id
    }));
  };

  componentDidMount() {
    this.loadSuppliers();
  }

  renderSuppliers = () => {
    return this.state.boardSuppliers.map(data => ({
      label: data.name,
      value: data.name
    }));
  };

  filterImages = async () => {
    try {
      let response = await Axios.get(
        baseUrl +
          "board/image/all?startDate=" +
          moment(this.state.startDate).format("YYYY-MM-DD") +
          "&endDate=" +
          moment(this.state.endDate).format("YYYY-MM-DD") +
          "&supplier=" +
          this.state.supplier.value +
          "&brand=" +
          this.state.brand.value
      );
      this.setState({ images: response.data });
      //console.log("Data loaded:" + response.data);
    } catch (e) {
      console.log("Iko shida:" + e);
    }
  };

  displayFilteredImages = () => {
    history.push("/board/images", { images: this.state.images });
  };

  render() {
    const { brand, supplier, startDate, endDate, images } = this.state;
    var { brands } = this.props;
    if (brands) {
      return (
        <div>
          <div>
            <Select
              value={brand}
              onChange={this.handleBrandChange}
              placeholder="Search by brand"
              options={this.renderList()}
            />
          </div>
          <div>
            <Select
              value={supplier}
              onChange={this.handleSupplierChange}
              placeholder="Search by Supplier"
              options={this.renderSuppliers()}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            Between{" "}
            <DatePicker
              selected={startDate}
              onChange={this.handleStartChange}
            />{" "}
            and <DatePicker selected={endDate} onChange={this.handlEndChange} />
          </div>
          <div>
            <Button
              style={{ float: "left" }}
              variant="success"
              onClick={() => {
                this.filterImages();
              }}
            >
              Search
            </Button>
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
                  <th>Date Uploaded</th>
                  <th>Bill Board</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {images.map(image => (
                  <tr key={image.id}>
                    <td>{image.id}</td>
                    <td>{image.description}</td>
                    <td>{image.dateCreated}</td>
                    <td>{image.board}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-primary bt-sm"
                        onClick={() => window.open(image.fileContent, "_blank")}
                      >
                        Download image
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button
            style={{ float: "left" }}
            variant="success"
            onClick={() => this.displayFilteredImages()}
          >
            Export filtered images to pdf
          </Button>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default BoardImages;
