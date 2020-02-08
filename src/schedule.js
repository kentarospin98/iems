import { Link } from 'react-router-dom'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'

import Navbar from './navbar.js'

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.task = props.task;
  }

  render = () => {
    return (
      <Link to={{pathname: "/task", query: {task: this.task}}}>
      <div className="card m-1 p-1">
        <div className="card-title task-title p-1">{this.task.task_name}</div>
        <div className="card-body">
          <div><FontAwesomeIcon icon={faCompass} /><span className="p-1">{this.task.location}</span></div>
          <div><FontAwesomeIcon icon={faClock} /><span className="p-1">Scheduled at {(new Date(this.task.scheduled_at)).toLocaleString('en-US')}</span></div>
          <div><FontAwesomeIcon icon={faHourglass} /><span className="p-1">Due at {(new Date(this.task.due_at)).toLocaleString('en-US')}</span></div>
        </div>
      </div>
      </Link>
    )
  }
}

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {}
    }
    this.apicon = props.apicon;
    if (localStorage.getItem("tasks")) {
      this.state.tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    props.apicon.getTasks(function(status, tasks) {
      if (status == "success") {
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.setState({tasks: tasks})
      }
    }.bind(this));
  }

  render = () => {
    let taskPanels = [];
    for(let i = 0; i < this.state.tasks.length; i++){
      taskPanels.push(<Task key={i} task={this.state.tasks[i]} />)
    }
    return (
      <div>
      <div className="schedule-page flex-center col-max pb-max pt-4 bg-light">
      <div className="mx-auto col-md-8 col-sm-10 col-12">
      <div className="card shadow-1 overflow-unset px-4 w-100">
      <div className="card-title mt-2 mb-2">
        <div className="h1 text-center">Schedule</div>
        <div className="h4 text-gray text-center">{(new Date()).toDateString()}</div>
      </div>
      </div>
      {taskPanels}
      </div>
      </div>
      <Navbar current="schedule"/>
      </div>
    )
  }
}
export default Schedule
