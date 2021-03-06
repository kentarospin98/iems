import React from 'react';
import { withRouter } from "react-router";

const DEBUG = true;

class Apicon {
  constructor() {
    // Postman collection
    // https://www.getpostman.com/collections/1c471f5f62c8faa6df80
    this.APIURL = "https://api-project-269146618053.appspot.com";
    this.APIENDPOINTS  = {
      LOGIN: "/iems/login",
      TASKS: "/iems/tasks",
      TASKDETAIL: "/iems/tasksdetail",
      TUTORIALS: "/iems/tutorial"
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

    let request = new XMLHttpRequest("POST");
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

  getTutorialList = (callback) => {
    callback("success",
    {
      page: 0,
      tutorials: [
        {
          title: "How to Fix a Chip in a Quartz Countertop",
          cover: "https://www.wikihow.com/images/thumb/8/84/Fix-a-Chip-in-a-Quartz-Countertop-Step-13.jpg/-crop-250-145-193px-Fix-a-Chip-in-a-Quartz-Countertop-Step-13.jpg",
          desc: "Quartz countertops are well known for being a sturdy and fuss-free option for kitchens. Made with a blend of stone and resin, quartz is a hard material like granite but also has an aesthetically pleasing glossy and non-porous surface. In spite of being tough, quartz countertops are not indestructible and may get chipped or cracked due to kitchen accidents. However, in most cases, you can repair the affected area without having to replace the entire slab. ",
          id: 1
        },
        {
          title: "Tutorial 2",
          cover: "https://linuxrocks.online/system/accounts/headers/000/016/416/original/data.png?1508866073",
          desc: "Description of the second Tutorial",
          id: 2
        }
      ]
    }
  )
  }

  getTutorial = (callback) => {
    callback("success", {
      title: "How to Fix a Chip in a Quartz Countertop.",
      steps: [
        {
          heading: "Clean the counter with an ammonia based cleaner.",
          text: "Before you get started with the repairs, clean the area with a non-abrasive cleaner. Spray the cleaner and wipe the area with a soft damp cloth. Wait for it to dry before you begin the repairs.",
          image: "https://www.wikihow.com/images/thumb/1/1b/Fix-a-Chip-in-a-Quartz-Countertop-Step-1.jpg/aid10305477-v4-728px-Fix-a-Chip-in-a-Quartz-Countertop-Step-1.jpg.webp"
        },
        {
          heading: "Stick masking tape around the chip for a better finish and to prevent adhesive stains",
          text: "Cordon off the chipped portion by sticking strips of masking or painter tape around it. This way it is easier to apply the adhesive only on the chipped part giving you a level and clean finish. It will also prevent unnecessary stains and spills from the adhesive on your counter. ",
          image: "https://www.wikihow.com/images/thumb/9/95/Fix-a-Chip-in-a-Quartz-Countertop-Step-2.jpg/aid10305477-v4-728px-Fix-a-Chip-in-a-Quartz-Countertop-Step-2.jpg.webp"
        },
        {
          heading: "Fix cracks on light coloured countertops with superglue",
          subheading: "Adhesive filler or super glue is a good option to repair minor chips on lighter coloured surfaces since they are less noticeable.",
          text: "Use a brush or spatula to apply thin coats of the glue on the affected area until the chip is level with the rest of the surface. Leave the glue to cure for at least 24 hours. Do not apply too much at one go as it going to extend the curing time. Choose superglue with a thin consistency to treat chipped surfaces and a thicker one for chipped edges.",
          image: "https://www.wikihow.com/images/thumb/b/bd/Fix-a-Chip-in-a-Quartz-Countertop-Step-3.jpg/aid10305477-v4-728px-Fix-a-Chip-in-a-Quartz-Countertop-Step-3.jpg.webp"
        },
        {
          heading: "Use pigmented epoxy adhesive for dark or textured counters.",
          text: "If your countertop is textured or is dark coloured, opt for a pigmented epoxy instead of superglue. For the best result, you can mix the epoxy with a dye that is in the closest shade to the surface. Apply this mix to the chipped area in the thin coats till it is level with the rest of the countertop. Let it dry for 24 hours.",
          image: "https://www.wikihow.com/images/thumb/7/75/Fix-a-Chip-in-a-Quartz-Countertop-Step-4.jpg/aid10305477-v4-728px-Fix-a-Chip-in-a-Quartz-Countertop-Step-4.jpg.webp"
        },
        {
          heading: "File the glue patch once it hardens.",
          text: "Use superfine sandpaper with a higher grit of 360 to 600 to smooth over the patch once it hardens.",
          image: "https://www.wikihow.com/images/thumb/4/48/Fix-a-Chip-in-a-Quartz-Countertop-Step-5.jpg/aid10305477-v4-728px-Fix-a-Chip-in-a-Quartz-Countertop-Step-5.jpg.webp"
        }
      ]
    });
  }

  getTasks = (callback) => {
    if (DEBUG) {
      callback("success", [
        {
          task_name: "Fix Countertop at Lokegaonkar's",
          task: 1,
          location: "1111 E Apache Blvd, Apt 140",
          scheduled_at: "2020-05-10 11:00",
          due_at: "2020-05-10 21:30"
        }
      ])
    } else {
      let request = new XMLHttpRequest("POST");
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

  getTaskdetails = (callback, taskId) => {
    if (DEBUG) {
      callback("success", {
        task_id: 1,
        subTasks: [
          {
            task_name: "Fix cracks in Marbles",
            location: "Kitchen",
            scheduled_at: "2020-05-10 12:00",
            due_at: "2020-05-10 14:00"
          },
          {
            task_name: "Repaint walls above the stove.",
            location: "Kitchen",
            scheduled_at: "2020-05-10 15:00",
            due_at: "2020-05-10 21:30"
          }
        ]
      })
    } else {
      let request = new XMLHttpRequest("POST");
      let form = new FormData()
      form.append("workerId", this.userId);
      form.append("taskId", taskId);

      request.onload = function(req) {
        if (req.status == 200) {
          let taskdetails = JSON.parse(req.responseText);
          callback("success", taskdetails);
        } else {
          callback("fail", null)
        }
      }
      request.onload = request.onload.bind(this, request);
      request.open("POST", this.APIURL+this.APIENDPOINTS.TASKDETAIL);
      request.send(form);
    }
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
        if (this.apicon.status === "success") {
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
