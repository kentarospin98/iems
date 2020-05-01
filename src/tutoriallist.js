import { Link } from 'react-router-dom'
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faClock, faHourglass } from '@fortawesome/free-solid-svg-icons'

import Navbar from './navbar.js'


class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.entry = props.entry;
  }

  render = () => {
    return (
      <Link className="links" to={{pathname: "/tutorial/"+this.entry.id}}>
      <div className="card m-1 p-1 shadow-1">
        <div className="card-title task-title p-1">
          <img src={this.entry.cover} class="img-cover img-rounded shadow" />
        </div>
        <div className="card-body">
          <div className="h1">{this.entry.title}</div>
          <div className="h4">{this.entry.desc}</div>
        </div>
      </div>
      </Link>
    )
  }
}

class TutorialList extends React.Component {
  constructor(props) {
    super(props);
    this.apicon = props.apicon;
    this.state = {}
    this.state.page = props.page ? props.page : null
    this._isMounted = false;

    if(props.page) {
      props.apicon.getTutorialList(function(status, list) {
        if (status == "success") {
          localStorage.setItem("tlist" + this.state.page, JSON.stringify(list));
          if (this._isMounted) {
            this.setState({tutorialList: list});
          } else {
            this.state.tutorialList = list;
          }
        }
      }.bind(this), props.page);
    }

  }

  componentWillMount = () => {
    this._isMounted = true;
  }

  render = () => {
    console.log(this.state.tutorialList);
    if (this.state.tutorialList == undefined) {
      return (
        <div>
          Loading...
          <Navbar current="schedule"/>
        </div>
      );
    }
    let tutorialListPanels = [];
    for(let i = 0; i < this.state.tutorialList.tutorials.length; i++){
      tutorialListPanels.push(<Panel key={i} entry={this.state.tutorialList.tutorials[i]} />)
    }
    return (
      <div>
      <div className="schedule-page flex-center col-max pb-max pt-4 bg-light">
      <div className="mx-auto col-md-8 col-sm-10 col-12">
      <div className="card shadow-1 overflow-unset px-4 w-100">
      <div className="card-title mt-2 mb-2">
        <div className="h1 text-center">{"Tutorial Listing"}</div>
        <div className="h4 text-gray text-center">Page {this.state.page}</div>
      </div>
      </div>
      {tutorialListPanels}
      </div>
      </div>
      <Navbar current="schedule"/>
      </div>
    );
  }
}

export default TutorialList
