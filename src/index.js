import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import {Login, Apicon} from './login.js';
import Schedule from './schedule.js';
import Tutorial from './tutorial.js';
import TutorialList from './tutoriallist.js';
import TaskDetails from './task.js';

let apicon = new Apicon();

function Home(props) {
  return (
    <BrowserRouter>
      <Route path="/login" render={ ()  => <Login apicon={apicon} /> } />
      <Route path="/tutorial/:id" render={ (props)  => <Tutorial id={props.match.params.id} apicon={apicon} /> } />
      <Route path="/tutoriallist" render={ (props)  => <TutorialList page='0' apicon={apicon} /> } />
      <Route path="/tutoriallist/:page" render={ (props)  => <TutorialList page={props.match.params.page} apicon={apicon} /> } />
      <Route path="/task" render={ (props) => <TaskDetails apicon={apicon} query={props.location.query}/>} />
      <Route path="/schedule" render={ ()  => <Schedule apicon={apicon} /> } />
      <Route exact path="/" render={() => (
          <Redirect to="/schedule" />
      )}/>
      { !apicon.loggedIn ? <Redirect to="/login" /> : <div></div> }
    </BrowserRouter>
);
}


export default Home;

ReactDOM.render(<App />, document.getElementById('root'));
