import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { baseUrl } from "./../utils/util";
import decode from "jwt-decode";
import { Route, BrowserRouter } from "react-router-dom";
import Main from "../client/agencyMain";
import ClientMain from "../client/clientMain";
//import AdminMain from "./../admin/adminMain";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      auth: false,
      sessionMsg: "",
      errorMesg: "",
      user: []
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async e => {
    e.preventDefault();
    await Axios.post(baseUrl + "auth-jwt/", this.state)
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
    await this.fetchUser();
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
      //console.log("Expiry time:" + exp + " current time:" + currentTime);
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

  fetchUser = async () => {
    let { user_id } = decode(localStorage.getItem("token"));
    try {
      let response = await Axios.get(baseUrl + "user/?id=" + user_id);
      localStorage.setItem("localUserAgency", response.data[0].agency);
      localStorage.setItem("localUserClient", response.data[0].client);
      this.setState({ user: response.data });
    } catch (e) {
      console.log("Iko Shida:" + e);
    }
  };

  render() {
    var { username, password, sessionMsg, errorMesg } = this.state;
    var isAlreadyAuthenticated = this.isAuthenticated();
    var userAgency = localStorage.getItem("localUserAgency");
    var userClient = localStorage.getItem("localUserClient");
    return (
      <BrowserRouter>
        {isAlreadyAuthenticated ? (
          <Route
            exact
            path="/"
            render={props =>
              userAgency !== "null" ? (
                <Main
                  isAuthenticated={isAlreadyAuthenticated}
                  userAgency={userAgency}
                />
              ) : userClient !== "null" ? (
                <ClientMain
                  isAuthenticated={isAlreadyAuthenticated}
                  userClient={userClient}
                ></ClientMain>
              ) : (
                <div>
                  <p>
                    Sorry,Credentials have not been authorized to see any
                    information!!
                  </p>
                  <p>Pleas, contact administrator for assistance</p>
                </div>
              )
            }
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

export default Login;
