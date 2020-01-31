import React from 'react';
import { withRouter } from "react-router";

class Apicon {
  constructor() {
    this.APIURL = "https://api-project-269146618053.appspot.com";
    this.APIENDPOINTS  = {
      LOGIN: "/iems/login",
      TASKS: "/iems/tasks"
    }

    if (localStorage.getItem("userId")) {
      this.loggedIn = true;
      this.userId = localStorage.getItem("userId");
    } else {
      this.loggedIn = false;
      this.userId = "";
    }


    this.status = "idle";
  }

  login = (callback) => {
    let loginform = new FormData(document.getElementById("loginform"));

    let request = new XMLHttpRequest();
    request.onload = function(req) {
      let resj = JSON.parse(req.responseText)
      if (req.status == 200) {
        if (resj.result === "Success") {
          this.loggedIn = true;
          this.status = "success";
          this.userId = resj.workerId;
          localStorage.setItem("userId", this.userId);
        }
      } else if(req.status == 401){
        if (resj.result == "Login Not Found") {
          this.loggedIn = false;
          this.status = "notAuthorized"
        }
      }
      callback(this);
    }
    request.onload = request.onload.bind(this, request);
    request.open("POST", this.APIURL+this.APIENDPOINTS.LOGIN);
    request.send(loginform);
  };

  getTasks = (callback) => {
    let request = new XMLHttpRequest();
    let form = new FormData()
    form.append("workerId", this.userId);

    request.onload = function(req) {
      if (req.status == 200) {
        let tasks = JSON.parse(req.responseText);
        callback("success", tasks);
      } else {
        callback("fail", null)
      }
    }
    request.onload = request.onload.bind(this, request);
    request.open("POST", this.APIURL+this.APIENDPOINTS.TASKS);
    request.send(form);
  }

}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.apicon = props.apicon;
    this.state = {
      loggedIn: false,
      status: "idle",
      usernameStatus: "idle",
      usernameError: "",
      passwordStatus: "idle",
      passwordError: ""
    }
  }

  login = () => {
    let usernameField = document.getElementById("username");
    let passwordField = document.getElementById("password");

    let newState = {status: 'idle'};

    if (usernameField.value.length == 0) {
      newState.usernameStatus = "error";
      newState.status = "invalidFields";
      newState.usernameError = "Username cannot be blank";
    } else {
      newState.usernameStatus = "idle";
      newState.usernameError = "";
    }

    if (passwordField.value.length == 0) {
      newState.passwordStatus = "error";
      newState.status = "invalidFields";
      newState.passwordError = "Username cannot be blank";
    } else {
      newState.passwordStatus = "idle";
      newState.passwordError = "";
    }

    if (newState.status == 'idle') {
      this.apicon.login(function() {
        console.log(this.apicon.status);
        if (this.apicon.status === "success") {
          // console.log(this);
          this.props.history.push("/schedule")
        }
      }.bind(this));
    }

    this.setState(newState);
  }

  render = () => {
    return (
      <div className="login-page flex-center-center pb-max pt-4 bg-light">
      <div className="mx-auto">
        <div className="card shadow-1 overflow-unset col-md-4 px-4 w-100">
          <div className="card-title mt-2">
            <div className="h1 text-center">Welcome to IEMS</div>
            <div className="h4 text-gray text-center">Please Login to proceed</div>
          </div>
          <div className="card-body">
            <form id="loginform" action="/login">
              <div className="group">
                <input type="text" id="username" name="username" placeholder='Username' className={'input ' + (this.state.usernameStatus == 'error' ?'danger' : '') } />
                {this.state.usernameStatus == 'error'? <label htmlFor="username" className="danger">{this.state.usernameError}</label> : ""}
              </div>

              <div className="group">
                <input type="password" id="password" name="password" placeholder='Password' className={'input ' + (this.state.passwordStatus == 'error' ?'danger' : '') } />
                {this.state.passwordStatus == 'error'? <label htmlFor="password" className="danger">{this.state.passwordError}</label> : ""}
              </div>

              <div className="group">
                <div className="custom-checkbox">
                  <input type="checkbox" id="rememberme" value="remember me" id="rememberMe" />
                  <label htmlFor="rememberMe" className="text-gray">Remember Me</label>
                </div>
              </div>

              <div className="group">
                <input type="button" onClick={this.login} value='Login' id="loginbtn" className="btn primary btn-lg block" />
              </div>
            </form>
          </div>
        </div>
        <div className="text-center weight-600 text-gray">
        <a href="/forgot" className="text-gray">Forgot Password</a> · <a href="/about"
        className="text-gray">About Us</a> · <a href="/contact" className="text-gray">Contact Us</a>
        </div>
        </div>
      </div>
    );
  }
}

// export default Apicon;
const LoginWithRouter = withRouter(Login)

export {LoginWithRouter as Login, Apicon};
// export {Login, Apicon};
