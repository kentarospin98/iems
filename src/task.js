import React from 'react';
import { withRouter, Redirect } from "react-router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

import Navbar from './navbar.js'

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    if (props.query) {
      this.state = {
        task: props.query.task
      }
    }
    console.log(this.state.task);
  }

  render = () => {
    if(this.state.task) {
      // for (var i = 0; i <  this.state.task.subTasks.length; i++) {
      //   console.log(this.state.task.subTasks[i]);
      // }
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
        Text
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
