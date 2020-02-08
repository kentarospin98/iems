import React from 'react';
import { withRouter } from "react-router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'


class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    if (props.query) {
      this.state = {
        task: props.query.task
      }
    }
  }

  render = () => {
    return (
      <div>{JSON.stringify(this.state.task ? this.state.task : "null")}</div>
    )
  }
}

export default TaskDetails;
