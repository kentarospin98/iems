import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import {Login, Apicon} from './login.js';
import Schedule from './schedule.js';

let apicon = new Apicon();

function Home(props) {
  return (
    <BrowserRouter>
      <Route path="/login" render={ ()  => <Login apicon={apicon} /> } />
      <Route path="/schedule" render={ ()  => <Schedule apicon={apicon} /> } />
      <Redirect path="/" to="/schedule" />
      { !apicon.loggedIn ? <Redirect to="/login" /> : <div></div> }
    </BrowserRouter>
    //<Schedule userid='0'/>
);
}


export default Home;

ReactDOM.render(<App />, document.getElementById('root'));
