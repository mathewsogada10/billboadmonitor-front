import React, { Component } from "react";
import history from "../../history";
//import ReactSearchBox from "react-search-box";
import { MDBDataTable } from "mdbreact";
import Select from "react-select";
import Axios from "axios";
import { baseUrl, styles } from "../utils/util";
import CompetitorModal from "./competitorModalView";

class ClientBillBoards extends Component {
  state = {
    brand: "",
    boards: [],
    competitors: []
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

  renderModal = competitors => {
    this.setState({ competitors: competitors });
  };

  checkCompetitor = board => {
    console.log("check board competitors" + board.competitors);
    if (board.competitors.length > 0) {
      return (
        <button
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target="#competitor"
          onClick={() => this.renderModal(board.competitors)}
        >
          Check Competitor
        </button>
      );
    } else {
      return "No Competitor";
    }
  };

  formatDecimals = value => {
    var doubleValue = parseFloat(value);
    return doubleValue.toFixed(7);
  };
  render() {
    var { brand, boards, competitors } = this.state;
    // var brds = this.state.boards ? this.state.boards : boards;
    // console.log("Loaded Boards:" + brds);
    let data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Description",
          field: "description",
          sort: "asc"
        },
        {
          label: "Type",
          field: "boardType",
          sort: "asc"
        },
        {
          label: "Latitude",
          field: "latittude",
          sort: "asc"
        },
        {
          label: "Longitude",
          field: "longitude",
          sort: "asc"
        },
        {
          label: "Owner",
          field: "owner",
          sort: "asc"
        },
        {
          label: "State",
          field: "state",
          sort: "asc"
        },
        {
          label: "Street",
          field: "street",
          sort: "asc"
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
          latittude: this.formatDecimals(board.latittude),
          longitude: this.formatDecimals(board.longitude),
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
        <div style={styles}>
          <div>
            <Select
              value={brand}
              onChange={this.handleBrandChange}
              placeholder="Search by brand"
              options={this.renderList()}
            />
          </div>
          <div>
            <MDBDataTable striped bordered hover data={data} />
          </div>
          <div className="modal" id="competitor">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Competitors</h4>
                  <button className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <CompetitorModal competitors={competitors}></CompetitorModal>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>To Get Billboads click on a client</div>;
    }
  }
}

export default ClientBillBoards;
