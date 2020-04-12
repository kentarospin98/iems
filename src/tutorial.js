// import { Link } from 'react-router-dom'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.apicon = props.apicon;
    this.id = props;
    console.log(props);
    console.log("Weird Redirect After this?");
  }

  render = () => {
    return (
      <p> Hello </p>
    )
  }
}

export default Tutorial
