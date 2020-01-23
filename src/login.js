import React from 'react';

const API = "https://api-project-269146618053.appspot.com"
const ENDPOINTS  = {
  LOGIN: "/iems/login"
}
const ORIGIN = "http://localhost:3000/"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      status: "idle",
      //reason: "idle"
      userid: -1
    }
  }

  login = () => {
    // let username = document.getElementById("username").value;
    // let password = document.getElementById("password").value;

    let loginform = new FormData(document.getElementById("loginform"));

    // for (let x of loginform.keys()){console.log(x);}

    // let loginform = new FormData()
    // loginform.append("username", username)
    // loginform.append("password", password)

    let request = new XMLHttpRequest();
    // console.log(this);
    request.onload = function(req) {
      // console.log(req);
      // let resj = {}
      // console.log(this)
      let resj = JSON.parse(req.responseText)
      if (req.status == 200) {
        if (resj.result === "Success") {
          this.setState({
            loggedIn: true,
            userid: resj.workerid,
            status: "success"
          })
        }
      } else if(req.status == 401){
        if (resj.result == "Login Not Found") {
          this.setState({
          loggedIn: false,
          status: "notFound"
        })
      }
    }
  }
    request.onload = request.onload.bind(this, request);
    request.open("POST", API+ENDPOINTS.LOGIN);
    //request.setRequestHeader("Access-Control-Request-Method", "POST");
    //request.setRequestHeader("Access-Control-Allow-Origin", ORIGIN);
    request.send(loginform);
  };

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
                <input type="text" id="username" name="username" placeholder='Username' className={'input ' + (this.state.status == 'notFound' ?'danger' : '') } />
              </div>

              <div className="group">
                <input type="password" id="password" name="password" placeholder='Password' className={'input ' + (this.state.status == 'notFound' ?'danger' : '') } />
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
export default Login;
