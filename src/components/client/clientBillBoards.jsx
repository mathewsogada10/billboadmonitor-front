import React, { Component } from "react";
import history from "../../history";
//import ReactSearchBox from "react-search-box";
import { MDBDataTable } from "mdbreact";
import Select from "react-select";
import Axios from "axios";
import { baseUrl } from "../utils/util";

class ClientBillBoards extends Component {
  state = {
    brand: "",
    boards: []
  };
  clickHandler = () => {
    history.push("/admin/Board/add");
  };

  clickManage = board => {
    history.push("/admin/Board/Manage", { board: board });
  };

  renderList = () => {
    return this.props.brands.map(data => ({
      label: data.name,
      value: data.id
    }));
  };

  handleBrandChange = async brand => {
    var boards = await this.filterBillboard(brand.value);
    console.log("filtered boards:" + boards);
    this.setState({ brand: brand, boards: boards });
  };

  filterBillboard = async brand => {
    var boards;
    try {
      let response = await Axios.get(baseUrl + "bill/board/all?brand=" + brand);
      boards = response.data;
    } catch (e) {
      console.log("Iko shida:" + e);
    }
    return boards;
  };

  componentDidUpdate(preProps) {
    if (preProps.boards !== this.props.boards) {
      var boards = this.props.boards;
      console.log("boards:" + boards);
      this.setState({ boards: boards });
    }
  }

  checkCompetitor = board => {
    console.log("check board competitors" + board.competitors);
    if (board.competitors.length > 0) {
      return (
        <button
          className="btn btn-primary bt-sm"
          onClickCapture={() => this.clickManage(board)}
        >
          Check Competitor
        </button>
      );
    } else {
      return "No Competitor";
    }
  };
  render() {
    var { brand, boards } = this.state;
    // var brds = this.state.boards ? this.state.boards : boards;
    // console.log("Loaded Boards:" + brds);
    let data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
          width: 150
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
          width: 270
        },
        {
          label: "Type",
          field: "boardType",
          sort: "asc",
          width: 200
        },
        {
          label: "Latitude",
          field: "latittude",
          sort: "asc",
          width: 100
        },
        {
          label: "Longitude",
          field: "longitude",
          sort: "asc",
          width: 150
        },
        {
          label: "Owner",
          field: "owner",
          sort: "asc",
          width: 100
        },
        {
          label: "State",
          field: "state",
          sort: "asc",
          width: 100
        },
        {
          label: "Street",
          field: "street",
          sort: "asc",
          width: 100
        },
        {
          label: "Action",
          field: "action"
        }
      ],
      rows: boards.map(board => {
        return {
          id: board.id,
          description: board.description,
          boardType: board.boardType,
          latittude: board.latittude,
          longitude: board.longitude,
          owner: board.owner,
          state: board.state,
          street: board.street,
          action: this.checkCompetitor(board)
        };
      })
    };

    if (boards.length > 0) {
      console.log("Boards check:" + boards);
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
            <MDBDataTable striped bordered small hover data={data} />
          </div>
        </div>
      );
    } else {
      return <div>To Get Billboads click on a client</div>;
    }
  }
}

export default ClientBillBoards;
