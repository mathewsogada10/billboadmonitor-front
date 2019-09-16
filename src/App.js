import React from "react";
import "bootstrap/dist/css/bootstrap.css";
//import logo from './logo.svg';
import "./App.css";
import Login from "./components/login/login";
import AdminLogin from "./components/admin/adminLogin";
import BoardForm from "./components/admin/forms/boardForm";
import { Route, Switch, withRouter } from "react-router-dom";
import ManageBoard from "./components/admin/manageBoard";
import ImagesDisplay from "./components/client/imagesDisplay";

function App() {
  return (
    <div className="App">
      <div className="p-3 mb-2 bg-light" style={{ height: "100vh" }}>
        <div>
          <h1>Welcome to Outdoor monitoring system</h1>
          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
            <Route exact path="/admin" component={withRouter(AdminLogin)} />
            <Route
              exact
              path="/admin/Board/add"
              component={withRouter(BoardForm)}
            />
            <Route
              exact
              path="/admin/Board/Manage"
              component={withRouter(ManageBoard)}
            />
            <Route
              exact
              path="/board/images"
              component={withRouter(ImagesDisplay)}
            ></Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
