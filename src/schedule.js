import React from 'react'

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
    return (
      <div className=""></div>
    )
  }
}
export default Schedule
