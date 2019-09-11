import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "../login/login";
import BoardForm from "./forms/boardForm";
import BrandBoardForm from "./forms/brandBoardForm";
import CompetitorForm from "./forms/competitorForm";
import imageForm from "./forms/imageForm";
//import { Map, GoogleApiWrapper } from "google-maps-react";

class AdminMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPage: null,
      inputType: ""
    };
  }

  clickHandler = e => {
    var btnClicked = e.target.name;
    var page = null,
      typeOfEntity = null;
    if (btnClicked === "competitor") {
      page = CompetitorForm;
      typeOfEntity = "bill board competitor";
    } else if (btnClicked === "brand") {
      page = BrandBoardForm;
      typeOfEntity = "bill board brand";
    } else if (btnClicked === "board") {
      page = BoardForm;
      typeOfEntity = "bill board";
    } else if (btnClicked === "image") {
      page = imageForm;
      typeOfEntity = "attaching bill board Image";
    }

    this.setState({
      displayPage: page,
      inputType: typeOfEntity
    });
  };

  render() {
    var { isAuthenticated } = this.props;
    var { displayPage, inputType } = this.state;
    return (
      <BrowserRouter>
        {!isAuthenticated ? (
          <Route path="/" component={Login} />
        ) : (
          <div className="p-3 mb-2 bg-light text-dark">
            <div className="row is-flex">
              <div className="col-md-3" style={{ backgroundColor: "white" }}>
                <div>
                  <h5 className="mb-0">
                    <nav className="navbar navbar-light">CLICK TO ADD NEW</nav>
                  </h5>
                </div>
                <div>
                  <button
                    name="board"
                    className="btn btn-primary btn-block btn-sm"
                    onClick={this.clickHandler}
                  >
                    Bill Board
                  </button>
                </div>
                <div>
                  <button
                    name="brand"
                    className="btn btn-primary btn-block btn-sm"
                    onClick={this.clickHandler}
                  >
                    BRAND ON BILLBOARD
                  </button>
                </div>
                <div>
                  <button
                    name="competitor"
                    className="btn btn-primary btn-block btn-sm"
                    onClick={this.clickHandler}
                  >
                    COMPETITOR ADVERT NEAR BILLBOARD
                  </button>
                </div>
                <div>
                  <button
                    name="image"
                    className="btn btn-primary btn-block btn-sm"
                    onClick={this.clickHandler}
                  >
                    Attach Image on billboard
                  </button>
                </div>
              </div>
              <div className="col-md-6" style={{ backgroundColor: "white" }}>
                <div>
                  <nav className="navbar navbar-light bg-light">
                    Data Input Form for {inputType}
                  </nav>
                </div>
                <div>
                  <Route component={displayPage} />
                </div>
              </div>
              <div className="col-md-3" />
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default AdminMain;
