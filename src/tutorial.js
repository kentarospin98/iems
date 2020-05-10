// import { Link } from 'react-router-dom'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'

import Navbar from './navbar.js'


class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.step = props.step;
  }

  render = () => {
    return (
      <div className="card m-1 p-1">
        <div className="card-title task-title p-1">
          <img src={this.step.image} class="img-cover img-rounded shadow" />
        </div>
        <div className="card-body">
          <div className="h2">{this.step.heading}</div>
          <div className="h4">{this.step.subheading}</div>
          <div className="p">{this.step.text}</div>
        </div>
      </div>
    )
  }
}

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.apicon = props.apicon;
    this.state = {}
    this.state.id = props.id ? props.id : null
    this._isMounted = false;

    if(props.id) {
      props.apicon.getTutorial(function(status, tutorial) {
        if (status == "success") {
          localStorage.setItem("tid" + this.state.id, JSON.stringify(tutorial));
          if (this._isMounted) {
            this.setState({tutorial: tutorial});
          } else {
            this.state.tutorial = tutorial;
          }
        }
      }.bind(this), props.id);
    }

  }

  componentWillMount = () => {
    this._isMounted = true;
  }

  render = () => {
    if (this.state.tutorial == null) {
      return (
        <div>
          <Navbar current="schedule"/>
        </div>
      );
    }
    let tutorialPanels = [];
    for(let i = 0; i < this.state.tutorial.steps.length; i++){
      tutorialPanels.push(<Panel key={i} step={this.state.tutorial.steps[i]} />)
    }
    return (
      <div>
      <div className="schedule-page flex-center col-max pb-max pt-4 bg-light">
      <div className="mx-auto col-md-8 col-sm-10 col-12">
      <div className="card shadow-1 overflow-unset px-4 w-100">
      <div className="card-title mt-2 mb-2">
        <div className="h1 text-center">{this.state.tutorial.title}</div>
        <div className="h4 text-gray text-center">{"Tutorial"}</div>
      </div>
      </div>
      {tutorialPanels}
      </div>
      </div>
      <Navbar current="schedule"/>
      </div>
    );
  }
}

export default Tutorial
