import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter, Redirect } from "react-router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCalendarPlus, faCompass, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'

import Navbar from './navbar.js'

class Subtask extends React.Component {
  constructor(props) {
    super(props);
    this.subtask = props.subtask;
  }

  render = () => {
    return (
      <Link className="links" to={{pathname: "/task", query: {task: this.task}}}>
      <div className="card m-1 p-1">
        <div className="card-title task-title p-1">{this.subtask.task_name}</div>
        <div className="card-body">
          <div><FontAwesomeIcon icon={faCompass} /><span className="p-1">{this.subtask.location}</span></div>
          <div><FontAwesomeIcon icon={faClock} /><span className="p-1">Scheduled at {(new Date(this.subtask.scheduled_at)).toLocaleString('en-US')}</span></div>
          <div><FontAwesomeIcon icon={faHourglass} /><span className="p-1">Due at {(new Date(this.subtask.due_at)).toLocaleString('en-US')}</span></div>
        </div>
      </div>
      </Link>
    )
  }
}

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    if (props.query) {
      this.state = {
        task: props.query.task
      }
    }
    if(props.query) {
      props.apicon.getTaskdetails(function(status, taskdetails) {
        if (status == "success") {
          localStorage.setItem("taskdetails", JSON.stringify(taskdetails));
          if (this._isMounted) {
            this.setState({taskdetails: taskdetails})
          } else {
            this.state.taskdetails = taskdetails;
          }
        }
      }.bind(this), props.query.task.task_id);
    }
  }

  componentWillMount = () => {
    this._isMounted = true;
  }

  render = () => {
    if(this.state.task) {
      let subtasks = [];
      if (this.state.taskdetails) {
        for (var i = 0; i <  this.state.taskdetails.subTasks.length; i++) {
          // console.log(this.state.taskdetails.subTasks[i]);
          subtasks.push(<Subtask key={i} subtask={this.state.taskdetails.subTasks[i]} />);
        }
      } else {
        subtasks = "Loading"
      }
      return (
        <div>
        <div className="task-page flex-center col-max pb-max pt-4 bg-light">
        <div className="mx-auto col-md-8 col-sm-10 col-12">
        <div className="card shadow-1 overflow-unset px-4 w-100">
        <div className="card-title mt-2 mb-2">
          <div className="h1 text-center">{this.state.task.task_name}</div>
          <div className="h4 text-gray text-center">
          Due on {(new Date(this.state.task.due_at)).toDateString()} at {(new Date(this.state.task.due_at)).toLocaleString('en-US',{hour:'numeric', minute:'numeric', hour12: true})}</div>
        </div>
        </div>
        {subtasks}
        </div>
        </div>
        <Navbar current="schedule"/>
        </div>
      )
    }
    else return <Redirect path="/task" to="/schedule" />
  }
}

export default TaskDetails;
