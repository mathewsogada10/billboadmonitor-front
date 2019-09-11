import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { baseUrl } from "../utils/util";
import decode from "jwt-decode";
import { Route, BrowserRouter } from "react-router-dom";
import AdmainMain from "../admin/adminMain";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      auth: false,
      sessionMsg: "",
      errorMesg: ""
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    Axios.post(baseUrl + "auth-jwt/", this.state)
      .then(response => {
        localStorage.setItem("token", response.data.token);
      })
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .catch(error => {
        this.setState({
          errorMesg: "Either Username or password is not correct!!",
          sessionMsg: ""
        });
        console.log(error);
      });
    this.setState({ auth: true });
  };

  isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token === "undefined" || refreshToken === "undefined") {
      return false;
    }
    try {
      const { exp } = decode(token);
      //check token
      var currentTime = new Date().getTime() / 1000;
      if (exp < currentTime) {
        this.setState({
          sessionMsg: "Sorry, Your Session Expired!! Please Login Again."
        });
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  render() {
    var { username, password, sessionMsg, errorMesg } = this.state;
    var isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <BrowserRouter>
        {isAlreadyAuthenticated ? (
          <Route
            exact
            path="/admin"
            render={props => (
              <AdmainMain isAuthenticated={isAlreadyAuthenticated} />
            )}
          />
        ) : (
          <form
            className="form"
            noValidate
            autoComplete="off"
            style={{ backgroundColor: "white" }}
            onSubmit={this.submitHandler}
          >
            <span>{sessionMsg}</span>
            <br />
            <span style={{ fontSize: 32 }}>Account Login</span>
            <div style={{ color: "red" }}>{errorMesg}</div>
            <div>
              <TextField
                id="txtusername"
                label="Username"
                name="username"
                margin="normal"
                value={username}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <TextField
                id="txtpassword"
                type="password"
                label="Password"
                name="password"
                margin="normal"
                value={password}
                onChange={this.changeHandler}
              />
            </div>
            <div>
              <a href="www.google.com">Forgot password?</a>
            </div>
            <br />
            <div>
              <Button variant="outlined" color="primary" type="submit">
                Signin
              </Button>
            </div>
            <br />
          </form>
        )}
      </BrowserRouter>
    );
  }
}

export default AdminLogin;
