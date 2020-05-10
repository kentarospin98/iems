import React from 'react';
import { withRouter } from "react-router";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.current
    }
  }

  render = () => {
    return (
      <div className="navigator">
      <nav className="navbar expanded default-nav">
          <div className="container-fluid">
              <div className="brand">
                  <a href="#!">IEMS</a>
              </div>
              <div className="menu-box" id="mainNav1">
                  <div className="menu-close"></div>
                  <ul className="menu ml-auto">
                      <li className=""><a href="/tutoriallist"><FontAwesomeIcon icon={faChartLine} /> Tutorials</a></li>
                  </ul>
              </div>
              <div className="menu-box" id="mainNav1">
                  <div className="menu-close"><i className="fa fa-close"></i></div>
                  <ul className="menu ml-auto">
                  <li className=""><a href="#!"><FontAwesomeIcon icon={faCalendarPlus} /> Schedule</a></li>
                  </ul>
              </div>
              <button className="toggler bg-secondary text-white" data-nav="#mainNav1"><i className="fa fa-bars"></i></button>
          </div>
      </nav>
      </div>
    )
  }
}

export default Navbar;
